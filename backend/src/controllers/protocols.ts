// Global protocol to ensure that the Response returns always the same pattern

export interface HTTPResponse<T> {
  statusCode: number
  body: T | string
}
