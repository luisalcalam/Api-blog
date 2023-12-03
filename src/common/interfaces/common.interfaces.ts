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

export interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}
