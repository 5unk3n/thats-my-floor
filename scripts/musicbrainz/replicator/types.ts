export interface ReplicationContext {
  sequence: number;
}

export enum OperationType {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface DataRow {
  [key: string]: any;
}

export interface TableChange {
  tableName: string;
  operation: OperationType;
  keys: DataRow; // PKs for Update/Delete
  values: DataRow; // New values for Insert/Update
}

export interface ReplicationPacket {
  sequence: number;
  changes: TableChange[];
}

export interface ReplicationOptions {
  limit?: number; // Max packets to process
}
