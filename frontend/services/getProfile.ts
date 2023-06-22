import { api } from "@/api/axios";
import { User } from "@/entities/user";
import { AxiosResponse } from "axios";

export const getProfile = async (): Promise<
  Pick<User, "firstname" | "lastName" | "email" | "phone"> | boolean
> => {
  try {
    const response: AxiosResponse<any, any> = await api.get("profile/");
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
