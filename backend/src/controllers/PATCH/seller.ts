import { type Seller } from "../../models/seller";
import { type User } from "../../models/user";
import { CreateLogRepository } from "../../repositories/CREATE/log";
import { SelectSellerRepository } from "../../repositories/SELECT/seller";
import { SelectUserRepository } from "../../repositories/SELECT/user";
import { UpdateSellerRepository } from "../../repositories/UPDATE/seller";
import { getIDFromToken } from "../../tools/getIDFromToken";
import {
  badRequest,
  headersAuthError,
  internalError,
  successfull,
  voidRequest,
} from "../helpers";
import { type HTTPRequest, type HTTPResponse } from "../protocols";

export class PatchSellerController {
  async patch(
    httpRequest: HTTPRequest<Partial<Seller>>
  ): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.body === undefined) {
        return voidRequest("Please provide a property to update");
      } else if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError("User not authenticated");
      } else if (httpRequest.params === undefined) {
        return badRequest("No seller was given to update");
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
          return badRequest("Product not found");
        }
        await new UpdateSellerRepository().update(
          +httpRequest.params.id,
          httpRequest.body
        );
        await new CreateLogRepository().create({
          action: "update seller",
          user_id: id,
        });
        return successfull("Seller updated successfully");
      }
    } catch (error) {
      return internalError("UPDATE SELLER FAILED INTERNAL ERROR");
    }
  }
}
