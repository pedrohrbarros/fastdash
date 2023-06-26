import { type User } from "../../models/user";
import { SelectUserRepository } from "../../repositories/SELECT/user";
import { badRequest, internalError, noContent, successfull } from "../helpers";
import { type HTTPRequest, type HTTPResponse } from "../protocols";
import { getIDFromToken } from "../../tools/getUserFromToken";

export class GetUserController {
  async getAll(
    httpRequest?: HTTPRequest<void>
  ): Promise<HTTPResponse<User[] | string>> {
    try {
      if (httpRequest?.headers?.access !== process.env.ACCESS_TOKEN) {
        return badRequest("Not authorized");
      }
      const users: User[] = await new SelectUserRepository().selectAll();
      if (users.length === 0) {
        return noContent("No users were found");
      } else {
        return successfull(users);
      }
    } catch (error) {
      return internalError("GET LIST USERS FAILED INTERNAL ERROR");
    }
  }

  async getProfile(
    httpRequest?: HTTPRequest<void>
  ): Promise<
    HTTPResponse<
      Pick<User, "firstname" | "lastname" | "email" | "phone"> | string
    >
  > {
    try {
      if (httpRequest?.headers?.authorization === undefined) {
        return badRequest("User not authenticated");
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization);
        const user: Pick<User, "firstname" | "lastname" | "email" | "phone"> =
          await new SelectUserRepository().selectOneById(id);
        if (user === undefined || user === null) {
          return badRequest("User does not exist");
        } else {
          return successfull(user);
        }
      }
    } catch (error) {
      console.log(error);
      return internalError("GET PROFILE FAILED INTERNAL ERROR");
    }
  }
}
