import { type HTTPRequest, type HTTPResponse } from '../protocols'

export interface IUpdateController<T> {
  handle: (httpRequest: HTTPRequest<Partial<T>>) => Promise<HTTPResponse<string>>
}

export interface IUpdateRepository<P> {
  updateModel: (id: string, params: P) => Promise<void>
}
