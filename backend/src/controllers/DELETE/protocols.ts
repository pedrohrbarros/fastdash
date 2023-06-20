import { type HTTPResponse, type HTTPRequest } from '../protocols'

export interface IDeleteRepository {
  deleteModel: (id: string) => Promise<void>
}

export interface IDeleteController<T> {
  handle: (httpRequest: HTTPRequest<T>) => Promise<HTTPResponse<string>>
}
