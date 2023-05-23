// Global protocol to ensure that the Response and Request returns always the same pattern

export interface HTTPResponse<T> {
  statusCode: number
  body: T | any
}

export interface HTTPRequest<B> {
  // Params to the URL to find any user maybe
  params?: any
  headers?: any
  body?: B
}
