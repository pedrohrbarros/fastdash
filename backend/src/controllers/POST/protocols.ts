import { type HTTPRequest, type HTTPResponse } from '../protocols'

export interface ICreateController<Model> {
  // Generic type on the HTTPRequest, because the body will inherit the properties of a model instance
  handle: (httpRequest: HTTPRequest<Model>) => Promise<HTTPResponse<string>>
}

export interface ICreateRepository<Param> {
  // The repository won't return any data from the database, as it's just a POST method
  createModel: (params: Param) => Promise<void>
}
