import { type HTTPResponse, type HTTPRequest } from '../protocols'

export interface IDeleteRepository {
  deleteModel: (id: string) => Promise<void>
}

export interface IDeleteController {
  handle: (httpRequest: HTTPRequest<{ permission: string }>) => Promise<HTTPResponse<string>>
}
