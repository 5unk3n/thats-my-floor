import { Readable } from 'stream';
import tar from 'tar-stream';
import bz2 from 'unbzip2-stream';

import { MB_SCHEMAS } from './schemas';
import { DataRow, OperationType, TableChange } from './types';

export class PacketParser {
  async parse(stream: Readable): Promise<TableChange[]> {
    return new Promise((resolve, reject) => {
      const extract = tar.extract();
      const changes: TableChange[] = [];

      // Map<SeqId, { keys: DataRow, values: DataRow }>
      const pendingData = new Map<string, { keys: DataRow; values: DataRow }>();
      const pendingOps: { seqId: string; tableName: string; op: string; xid: string }[] = [];

      extract.on('entry', (header, stream, next) => {
        const parts = header.name.split('/');
        const filename = parts[parts.length - 1];
        let buffer = '';

        stream.on('data', (chunk) => (buffer += chunk));
        stream.on('end', () => {
          if (filename === 'dbmirror_pending') {
            const lines = buffer.split('\n');
            for (const line of lines) {
              if (!line.trim()) continue;
              const [seqId, rawTableName, op, xid] = line.split('\t');

              const tableName = rawTableName.replace(/"/g, '').split('.').pop() || rawTableName;
              pendingOps.push({ seqId, tableName, op, xid });
            }
          } else if (filename === 'dbmirror_pendingdata') {
            const lines = buffer.split('\n');

            for (const line of lines) {
              if (!line.trim()) continue;
              // Format: SeqId \t IsKey \t DataString
              const sections = line.split('\t');
              if (sections.length < 3) continue;

              const seqId = sections[0];
              const isKey = sections[1];
              // Data is the rest of the line (it might contain tabs if escaped, but here we treat it as one block)
              const dataString = sections.slice(2).join('\t');

              if (!pendingData.has(seqId)) {
                pendingData.set(seqId, { keys: {}, values: {} });
              }
              const entry = pendingData.get(seqId)!;

              try {
                const parsedRow = this.parseRowTuple(dataString);
                if (isKey === 't') {
                  entry.keys = parsedRow;
                } else {
                  entry.values = parsedRow;
                }
              } catch (e) {
                console.warn(`[Parser] Failed to parse row tuple for seqId ${seqId}:`, e);
              }
            }
          }
          next();
        });

        stream.resume(); // Ensure stream is drained
      });

      extract.on('finish', () => {
        try {
          for (const op of pendingOps) {
            const schema = MB_SCHEMAS[op.tableName];
            if (!schema) {
              // Ignore tables we don't care about
              continue;
            }

            const data = pendingData.get(op.seqId);
            if (!data) {
              // Ideally this shouldn't happen, but we skip if data is missing
              continue;
            }

            const change: TableChange = {
              tableName: op.tableName,
              operation: this.mapOperation(op.op),
              keys: data.keys,
              values: data.values,
            };

            changes.push(change);
          }
          resolve(changes);
        } catch (e) {
          reject(e);
        }
      });

      extract.on('error', (err) => {
        reject(err);
      });

      stream.pipe(bz2()).pipe(extract);
    });
  }

  private mapOperation(op: string): OperationType {
    switch (op) {
      case 'i':
        return OperationType.INSERT;
      case 'u':
        return OperationType.UPDATE;
      case 'd':
        return OperationType.DELETE;
      default:
        throw new Error(`Unknown operation: ${op}`);
    }
  }

  private parseRowTuple(dataString: string): DataRow {
    const result: DataRow = {};
    // Regex to match "key"='value'
    // Handles quoted keys and single-quoted values with escaped quotes
    // Note: Parsing this strictly with regex is tricky if values contain crazy chars,
    // but for Postgres standard tuple output it generally works.
    const regex = /"([^"]+)"='((?:[^']|'')*)'/g;

    let match;
    while ((match = regex.exec(dataString)) !== null) {
      const key = match[1];
      let val = match[2];

      // Unescape single quotes ('' -> ') if used by Postgres
      // Unescape standard backslash escapes if used (\n, \t, etc)
      // Since MB might use standard escaping or just SQL style:
      // Try common replacements.

      // Replaces '' with '
      val = val.replace(/''/g, "'");
      // Replaces \\ with \
      val = val.replace(/\\\\/g, '\\');

      if (val === '\\N') {
        result[key] = null;
      } else {
        // Handle \r \n etc if they exist in raw form
        // But usually they are literal in SQL strings unless E'' syntax is used.
        // We'll take value as is mostly.
        result[key] = val;
      }
    }
    return result;
  }
}
