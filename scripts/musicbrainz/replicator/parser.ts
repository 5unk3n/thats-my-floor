import { Readable } from 'stream';
import tar from 'tar-stream';
import bz2 from 'unbzip2-stream';

import { TableChange } from './types';

interface PendingData {
  [id: string]: any; // Simplified
}

export class PacketParser {
  async parse(stream: Readable): Promise<TableChange[]> {
    return new Promise((resolve, reject) => {
      const extract = tar.extract();
      const changes: TableChange[] = [];

      const pendingOps: any[] = [];
      const pendingData: Map<string, string[]> = new Map(); // Table -> Lines (TSV)

      extract.on('entry', (header, stream, next) => {
        const parts = header.name.split('/');
        const filename = parts[parts.length - 1];

        // Metadata about changes (Old format?)
        if (filename === 'PENDING') {
          let buffer = '';
          stream.on('data', (chunk) => (buffer += chunk));
          stream.on('end', () => {
            const lines = buffer.split('\n');
            for (const line of lines) {
              if (!line.trim() || line.startsWith('#')) continue;
              const cols = line.split('\t');
              if (cols.length >= 3) {
                pendingOps.push({
                  tableName: cols[0],
                  op: cols[1],
                  txId: cols[2],
                  keys: cols.slice(3),
                });
              }
            }
            next();
          });
        }
        // Data for changes (Old format?)
        else if (filename === 'PENDING_DATA') {
          let buffer = '';
          stream.on('data', (chunk) => (buffer += chunk));
          stream.on('end', () => {
            // Store pending data validation/parsing here if we knew strict format
            next();
          });
        }
        // Standard Replication (DbMirror)
        else {
          let buffer = '';
          stream.on('data', (chunk) => (buffer += chunk));
          stream.on('end', () => {
            if (filename === 'dbmirror_pending') {
              // dbmirror_pending usually contains the operations
              const lines = buffer.split('\n');
              pendingOps.push(...lines.filter((l) => l.trim()));
            } else if (filename === 'dbmirror_pending_data') {
              // dbmirror_pending_data contains the data
              pendingData.set('data', buffer.split('\n'));
            }
            next();
          });
        }
      });

      extract.on('finish', () => {
        // Process buffered data
        // Here we would match pendingOps with pendingData and construct TableChange objects.
        // For now, resolving empty.
        resolve(changes);
      });

      extract.on('error', (err) => {
        reject(err);
      });

      stream.pipe(bz2()).pipe(extract);
    });
  }
}
