export interface CustomResponse<T> {
  content: T;
  pagination?: Pagination;
}

export interface Pagination {
  perPage: number;
  currentPage: number;
  totalPages: number;
  totalRows: number;
}
