export interface PaginationParams {
  page?: number; // 1-based index (default: 1)
  limit?: number; // default: 10
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}
