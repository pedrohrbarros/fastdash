// Global protocols

export interface HTTPResponse<T> {
  statusCode: HTTPStatusCode
  body: T | string
}

export interface URLParams {
  // Params in the URL
  id: string
}

export enum HTTPStatusCode {
  VOID_REQUEST = 404,
  BAD_REQUEST = 400,
  INTERNAL_ERROR = 500,
  BAD_PERMISSION = 403,
  HEADERS_AUTH_ERROR = 401,
  SUCCESSFULL = 200,
  NOCONTENT = 204
}

export interface HTTPRequest<B> {
  params?: URLParams
  // If the request is to PATCH(modify/update)/ DELETE a user inside the application, it will be required the role to determine the hierarchy
  permission?: string
  body?: B
}
