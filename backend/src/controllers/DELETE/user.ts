import { type HTTPRequest, type HTTPResponse } from "../protocols";
import { headersAuthError, internalError, successfull } from "../helpers";
import { getIDFromToken } from "../../tools/getIDFromToken";
import { RemoveUserRepository } from "../../repositories/REMOVE/user";
import { CreateLogRepository } from "../../repositories/CREATE/log";
import { SelectUserRepository } from "../../repositories/SELECT/user";
import { type User } from "../../models/user";

export class DeleteUserController {
  async delete(httpRequest: HTTPRequest<void>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError("User not authenticated");
      } else {
        await new RemoveUserRepository().remove(
          await getIDFromToken(httpRequest.headers.authorization)
        );
        const id = await getIDFromToken(httpRequest.headers.authorization);
        const user: User = await new SelectUserRepository().selectOne(id);
        if (user === undefined || user === null) {
          return headersAuthError("User with this token not found");
        }
        await new CreateLogRepository().create({
          action: "remove himself",
          user_id: id,
        });
        return successfull("User deleted successfully");
      }
    } catch (error) {
      return internalError("DELETE USER FAILED INTERNAL ERROR");
    }
  }
}
