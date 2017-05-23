export interface ApiResponse<T> {
  results: T,
  count: number,
  previous: string,
  next: string
}

