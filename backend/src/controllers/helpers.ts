import { HTTPStatusCode, type HTTPResponse } from './protocols'

export const voidRequest = (message: string): HTTPResponse<string> => ({
  statusCode: HTTPStatusCode.VOID_REQUEST,
  body: message
})

export const badRequest = (message: string): HTTPResponse<string> => ({
  statusCode: HTTPStatusCode.BAD_REQUEST,
  body: message
})

export const internalError = (message: string): HTTPResponse<string> => ({
  statusCode: HTTPStatusCode.INTERNAL_ERROR,
  body: message
})

export const badPermission = (message: string): HTTPResponse<string> => ({
  statusCode: HTTPStatusCode.BAD_PERMISSION,
  body: message
})

export const headersAuthError = (message: string): HTTPResponse<string> => ({
  statusCode: HTTPStatusCode.HEADERS_AUTH_ERROR,
  body: message
})

export const successfull = <D>(message: string | D): HTTPResponse<string | D> => ({
  statusCode: HTTPStatusCode.SUCCESSFULL,
  body: message
})

export const noContent = (message: string): HTTPResponse<string> => ({ statusCode: 204, body: message })
