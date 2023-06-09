import { type User } from "../../models/user";
import { SelectUserRepository } from "../../repositories/SELECT/user";
import {
  badResponse,
  headersAuthError,
  internalError,
  successfull,
} from "../helpers";
import { type HTTPRequest, type HTTPResponse } from "../protocols";
import { getIDFromToken } from "../../tools/getIDFromToken";

export class GetUserController {
  async getAll(
    httpRequest: HTTPRequest<void>
  ): Promise<HTTPResponse<User[] | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError("User not authenticated");
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization);
        const user: User = await new SelectUserRepository().selectOne(id);
        if (user === undefined || user === null) {
          return headersAuthError("User with this token not found");
        }
        const users: User[] = await new SelectUserRepository().selectAll();
        return successfull(users);
      }
    } catch (error) {
      return internalError("GET USERS FAILED INTERNAL ERROR");
    }
  }

  async getOne(
    httpRequest: HTTPRequest<void>
  ): Promise<HTTPResponse<User | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError("User not authenticated");
      } else {
        const user: User = await new SelectUserRepository().selectOne(
          await getIDFromToken(httpRequest.headers.authorization)
        );
        if (user === undefined || user === null) {
          return badResponse("User does not exist");
        } else {
          return successfull(user);
        }
      }
    } catch (error) {
      return internalError("GET USER FAILED INTERNAL ERROR");
    }
  }
}
