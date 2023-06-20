// Global protocols
export interface HTTPResponse<T> {
  statusCode: HTTPStatusCode
  body: T | string
}

export interface HTTPRequest<B> {
  params?: B
  headers?: B
  body?: B
}

export enum HTTPStatusCode {
  VOID_REQUEST = 404,
  BAD_REQUEST = 400,
  INTERNAL_ERROR = 500,
  BAD_RESPONSE = 502,
  BAD_PERMISSION = 403,
  HEADERS_AUTH_ERROR = 401,
  SUCCESSFULL = 200,
  NOCONTENT = 204,
  UNAUTHORIZED = 401
}
