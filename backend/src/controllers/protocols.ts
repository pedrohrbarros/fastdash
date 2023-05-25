// Global protocols

export interface HTTPResponse<T> {
  statusCode: number
  body: T | string | any
}

export interface HTTPRequest<B> {
  params?: string
  headers?: string
  body?: B
}
