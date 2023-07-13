import { type Seller } from "../../models/seller";
import { type User } from "../../models/user";
import { SelectSellerRepository } from "../../repositories/SELECT/seller";
import { SelectUserRepository } from "../../repositories/SELECT/user";
import { getIDFromToken } from "../../tools/getIDFromToken";
import {
  badRequest,
  badResponse,
  headersAuthError,
  internalError,
  successfull,
} from "../helpers";
import { type HTTPRequest, type HTTPResponse } from "../protocols";

export class GetSellerController {
  async getAll(
    httpRequest: HTTPRequest<void>
  ): Promise<HTTPResponse<Seller[] | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError("User not authenticated");
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization);
        const user: User = await new SelectUserRepository().selectOne(id);
        if (user === undefined || user === null) {
          return headersAuthError("User with this token not found");
        }
        const sellers: Seller[] =
          await new SelectSellerRepository().selectAll();
        return successfull(sellers);
      }
    } catch (error) {
      return internalError("GET SELLERS FAILED INTERNAL ERROR");
    }
  }

  async getOne(
    httpRequest: HTTPRequest<void>
  ): Promise<HTTPResponse<Seller | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError("User not authenticated");
      } else if (httpRequest.params === undefined) {
        return badRequest("No parameters were given");
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization);
        const user: User = await new SelectUserRepository().selectOne(id);
        if (user === undefined || user === null) {
          return headersAuthError("User with this token not found");
        }
        const seller: Seller = await new SelectSellerRepository().selectOne(
          +httpRequest.params.id
        );
        if (seller === undefined || seller === null) {
          return badResponse("Seller does not exist");
        } else {
          return successfull(seller);
        }
      }
    } catch (error) {
      return internalError("GET SELLER FAILED INTERNAL ERROR");
    }
  }
}
