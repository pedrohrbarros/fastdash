import { type Product } from "../../models/product";
import { type User } from "../../models/user";
import { CreateLogRepository } from "../../repositories/CREATE/log";
import { CreateProductRepository } from "../../repositories/CREATE/product";
import { SelectUserRepository } from "../../repositories/SELECT/user";
import { getIDFromToken } from "../../tools/getIDFromToken";
import {
  headersAuthError,
  internalError,
  successfull,
  voidRequest,
} from "../helpers";
import { type HTTPRequest, type HTTPResponse } from "../protocols";

export class PostProductController {
  async post(httpRequest: HTTPRequest<Product>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError("User not authenticated");
      } else if (httpRequest.body === undefined) {
        return voidRequest("Please specify a body");
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization);
        const user: User = await new SelectUserRepository().selectOne(id);
        if (user === undefined || user === null) {
          return headersAuthError("User with this token not found");
        }
        await new CreateProductRepository().create(httpRequest.body);
        await new CreateLogRepository().create({
          action: "create product",
          user_id: id,
        });
        return successfull("Product created successfully");
      }
    } catch (error) {
      return internalError("CREATE PRODUCT FAILED INTERNAL ERROR");
    }
  }
}
