import { type Log } from "../../models/log";
import { type User } from "../../models/user";
import { SelectLogRepository } from "../../repositories/SELECT/log";
import { SelectUserRepository } from "../../repositories/SELECT/user";
import { getIDFromToken } from "../../tools/getIDFromToken";
import { headersAuthError, internalError, successfull } from "../helpers";
import { type HTTPResponse, type HTTPRequest } from "../protocols";

export class GetLogController {
  async getAll(
    httpRequest: HTTPRequest<void>
  ): Promise<HTTPResponse<Log[] | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError("User not authenticated");
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization);
        const user: User = await new SelectUserRepository().selectOne(id);
        if (user === undefined || user === null) {
          return headersAuthError("User with this token not found");
        }
        const logs: Log[] = await new SelectLogRepository().selectAll();
        return successfull(logs);
      }
    } catch (error) {
      return internalError("GET LOGS FAILED INTERNAL ERROR");
    }
  }
}
