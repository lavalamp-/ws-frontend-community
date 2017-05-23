export interface HttpTransaction {
  response_headers: any[],
  content_type: string,
  content_length: number,
  content_hash: string,
  content_secondary_hash: string,
  request_method: string,
  response_status: number,
  url: string,
}
