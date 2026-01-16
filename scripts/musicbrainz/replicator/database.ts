import { Pool, PoolClient } from 'pg';

import { OperationType, TableChange } from './types';

export class DatabaseHandler {
  private pool: Pool;

  constructor(connectionString: string) {
    this.pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }

  async close() {
    await this.pool.end();
  }

  async getCurrentSequence(): Promise<number> {
    const client = await this.pool.connect();
    try {
      const res = await client.query(
        'SELECT current_replication_sequence FROM replication_control ORDER BY id DESC LIMIT 1'
      );
      if (res.rows.length === 0) {
        throw new Error('Replication control table is empty. Please run import.sh first.');
      }
      return res.rows[0].current_replication_sequence;
    } finally {
      client.release();
    }
  }

  async applyPacket(sequence: number, changes: TableChange[]): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('SET CONSTRAINTS ALL DEFERRED');

      for (const change of changes) {
        await this.applyChange(client, change);
      }

      // Update sequence
      await client.query(
        'UPDATE replication_control SET current_replication_sequence = $1, last_replication_date = NOW()',
        [sequence]
      );

      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  private async applyChange(client: PoolClient, change: TableChange) {
    const tableName = `mb_${change.tableName}`;

    // We only replicate specific tables: artist, artist_alias, url, l_artist_url, link, link_type
    const ALLOWED_TABLES = [
      'mb_artist',
      'mb_artist_alias',
      'mb_url',
      'mb_l_artist_url',
      'mb_link',
      'mb_link_type',
    ];
    if (!ALLOWED_TABLES.includes(tableName)) {
      return;
    }

    switch (change.operation) {
      case OperationType.INSERT:
        await this.applyInsert(client, tableName, change);
        break;
      case OperationType.UPDATE:
        await this.applyUpdate(client, tableName, change);
        break;
      case OperationType.DELETE:
        await this.applyDelete(client, tableName, change);
        break;
    }
  }

  private async applyInsert(client: PoolClient, tableName: string, change: TableChange) {
    if (!change.values || Object.keys(change.values).length === 0) {
      console.warn(`Skipping INSERT for ${tableName}: No values provided.`);
      return;
    }
    const cols = Object.keys(change.values)
      .map((c) => `"${c}"`)
      .join(', ');
    const vals = Object.values(change.values);
    const params = vals.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO "${tableName}" (${cols}) VALUES (${params})`;
    await client.query(query, vals);
  }

  private async applyUpdate(client: PoolClient, tableName: string, change: TableChange) {
    if (!change.keys || Object.keys(change.keys).length === 0) {
      console.warn(`Skipping UPDATE for ${tableName}: No keys (PK) provided.`);
      return;
    }
    if (!change.values || Object.keys(change.values).length === 0) {
      console.warn(`Skipping UPDATE for ${tableName}: No values to update.`);
      return;
    }

    const setClauses: string[] = [];
    const vals: (string | number | null | undefined)[] = [];
    let pIdx = 1;

    for (const [k, v] of Object.entries(change.values)) {
      setClauses.push(`"${k}" = $${pIdx++}`);
      vals.push(v);
    }

    const whereClauses: string[] = [];
    for (const [k, v] of Object.entries(change.keys)) {
      whereClauses.push(`"${k}" = $${pIdx++}`);
      vals.push(v);
    }

    const query = `UPDATE "${tableName}" SET ${setClauses.join(', ')} WHERE ${whereClauses.join(' AND ')}`;
    await client.query(query, vals);
  }

  private async applyDelete(client: PoolClient, tableName: string, change: TableChange) {
    if (!change.keys || Object.keys(change.keys).length === 0) {
      console.warn(`Skipping DELETE for ${tableName}: No keys (PK) provided.`);
      return;
    }

    const whereClauses: string[] = [];
    const vals: (string | number | null | undefined)[] = [];
    let pIdx = 1;

    for (const [k, v] of Object.entries(change.keys)) {
      whereClauses.push(`"${k}" = $${pIdx++}`);
      vals.push(v);
    }

    const query = `DELETE FROM "${tableName}" WHERE ${whereClauses.join(' AND ')}`;
    await client.query(query, vals);
  }
}
