import { type HTTPRequest, type HTTPResponse } from '../protocols'

export interface IUpdateController<Model> {
  handle: (httpRequest: HTTPRequest<Partial<Model>>) => Promise<HTTPResponse<string>>
}

export interface IUpdateRepository<Parameter> {
  updateModel: (id: string, params: Parameter) => Promise<void>
}
