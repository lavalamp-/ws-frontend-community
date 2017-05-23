export interface ErrorApiResponse {
  status_code: number,
  message: string,
  detail: string,
  error_fields: any[],
}
