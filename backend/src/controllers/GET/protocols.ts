import { type HTTPRequest, type HTTPResponse } from '../protocols'

export interface IGetController<Model> {
  // It can have a parameter like: the ID on the URL to get just one model
  // HTTPRequest properties are null because, there isn't a body to the GET Method, only a ID parameter
  handle: (httpRequest?: HTTPRequest<void>) => Promise<HTTPResponse<Model[] | string>>
}

export interface IGetRepository<Model> {
  getModels: (id?: string) => Promise<Model[]>
}


export interface IGetPropertyRepository {
  getModelsSingleProperty: (property: string) => Promise<string[]>
}