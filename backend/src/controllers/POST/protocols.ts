import { type HTTPRequest, type HTTPResponse } from '../protocols'

export interface ICreateController<T> {
  // Generic type on the HTTPRequest, because the body will inherit the properties of a model instance
  handle: (httpRequest: HTTPRequest<T>) => Promise<HTTPResponse<string>>
}

export interface ICreateRepository<P> {
  // The repository won't return any data from the database, as it's just a POST method
  createModel: (params: P) => Promise<void>
}
