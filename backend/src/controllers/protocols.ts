import { type IncomingHttpHeaders } from 'http'

// Global protocols
export interface HTTPResponse<T> {
  statusCode: HTTPStatusCode
  body: T | string
}

export interface HTTPRequest<B> {
  params?: { id: number }
  headers?: IncomingHttpHeaders
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
  UNAUTHORIZED = 401
}
