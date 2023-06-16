import { type HTTPRequest } from '../protocols'

export interface ILoginController<T> {
  handle: (httpRequest: HTTPRequest<T>) => Promise<HTTPRequest<string>>
}

export interface ILoginRepository<P> {
  loginModel: (email: string) => Promise<P[]>
}
