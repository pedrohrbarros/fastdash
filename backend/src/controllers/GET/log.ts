import { type Log } from '../../models/log'
import { SelectLogRepository } from '../../repositories/SELECT/log'
import { headersAuthError, internalError, successfull } from '../helpers'
import { type HTTPResponse, type HTTPRequest } from '../protocols'

export class GetLogController {
  async getAll (httpRequest: HTTPRequest<void>): Promise<HTTPResponse<Log[] | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else {
        const logs: Log[] = await new SelectLogRepository().selectAll()
        return successfull(logs)
      }
    } catch (error) {
      return internalError('GET LOGS FAILED INTERNAL ERROR')
    }
  }
}
