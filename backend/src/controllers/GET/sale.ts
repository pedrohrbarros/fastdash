import { type Sale } from "../../models/sale";
import { type User } from "../../models/user";
import { SelectSaleRepository } from "../../repositories/SELECT/sale";
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

export class GetSaleController {
  async getAll(
    httpRequest: HTTPRequest<void>
  ): Promise<HTTPResponse<Sale[] | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError("User not authenticated");
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization);
        const user: User = await new SelectUserRepository().selectOne(id);
        if (user === undefined || user === null) {
          return headersAuthError("User with this token not found");
        }
        const sales: Sale[] = await new SelectSaleRepository().selectAll();
        return successfull(sales);
      }
    } catch (error) {
      return internalError("GET SALES FAILED INTERNAL ERROR");
    }
  }

  async getOne(
    httpRequest: HTTPRequest<void>
  ): Promise<HTTPResponse<Sale | string>> {
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
        const sale: Sale = await new SelectSaleRepository().selectOne(
          +httpRequest.params.id
        );
        if (sale === undefined || sale === null) {
          return badResponse("Sale does not exist");
        } else {
          return successfull(sale);
        }
      }
    } catch (error) {
      return internalError("GET SALE FAILED INTERNAL ERROR");
    }
  }
}
