// Global protocols

export interface HTTPResponse<T> {
  statusCode: number
  body: T | string | any
}

export interface AcceptableParams {
  // Add more parameter to compose the URL
  id: string
}

export interface HTTPRequest<B> {
  params?: AcceptableParams
  // If the request is to PATCH(modify/update)/ DELETE a user inside the application, it will be required the role to determine the hierarchy
  permission?: string
  // headers?: string
  body?: B
}
