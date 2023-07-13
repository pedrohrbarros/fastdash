import { type Seller } from "../../models/seller";
import { type User } from "../../models/user";
import { CreateLogRepository } from "../../repositories/CREATE/log";
import { RemoveSellerRepository } from "../../repositories/REMOVE/seller";
import { SelectSellerRepository } from "../../repositories/SELECT/seller";
import { SelectUserRepository } from "../../repositories/SELECT/user";
import { getIDFromToken } from "../../tools/getIDFromToken";
import {
  badRequest,
  headersAuthError,
  internalError,
  successfull,
} from "../helpers";
import { type HTTPRequest, type HTTPResponse } from "../protocols";

export class DeleteSellerController {
  async delete(httpRequest: HTTPRequest<void>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError("User not authenticated");
      } else {
        if (httpRequest.params === undefined) {
          return badRequest("No parameters was provided");
        } else {
          const seller: Seller = await new SelectSellerRepository().selectOne(
            +httpRequest.params.id
          );
          if (seller === undefined || seller === null) {
            return badRequest("Product not found");
          }
          await new RemoveSellerRepository().remove(+httpRequest.params.id);
          const id = await getIDFromToken(httpRequest.headers.authorization);
          const user: User = await new SelectUserRepository().selectOne(id);
          if (user === undefined || user === null) {
            return headersAuthError("User with this token not found");
          }
          await new CreateLogRepository().create({
            action: "remove seller",
            user_id: id,
          });
          return successfull("Seller deleted successfully");
        }
      }
    } catch (error) {
      return internalError("DELETE SELLER FAILED INTERNAL ERROR");
    }
  }
}
