import { UserJson } from "@/interfaces/user.interface";
import AuthSetting from "@/models/auth_setting.model";
import User from "@/models/user.model";
import api from "@/utils/api.util";
import AppConstants from "@/utils/constants.util";
import axios from "axios";

interface AuthPromiseResponse {
  data?: UserJson;
  refresh?: string;
  access?: string;
  success?: string;
  exp?: string;
  message?: string;
  errors?: {
    firstname?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
  };
}

interface AuthData {
  email: string;
  password: string;
}

class AuthAPI {
  static async login(data: AuthData): Promise<AuthPromiseResponse | undefined> {
    let promiseResponse: AuthPromiseResponse | undefined = undefined;

    await axios
      .post(`https://api.coobet.app/auth/login`, {
        email_or_phone: data.email,
        password: data.password,
      })
      .then((response) => {
        promiseResponse = response.data;
      })
      .catch((error) => {
        promiseResponse = error.response.data;
        console.error(error);
      });

    return promiseResponse;
  }

  static async setting(
    data: AuthSetting,
  ): Promise<AuthPromiseResponse | undefined> {
    let promiseResponse: AuthPromiseResponse | undefined = undefined;

    try {
      const response = await api.post<AuthPromiseResponse>(
        `https://api.coobet.app/auth/change_password`,
        data.toJson(),
      );

      promiseResponse = response.data;
    } catch (error: any) {
      console.log(`Error when updating password`);
      promiseResponse = error.response.data;
      console.error(error);
    }

    return promiseResponse;
  }

  static async logout(
    authenticatedUser: User,
  ): Promise<AuthPromiseResponse | undefined> {
    let promiseResponse: AuthPromiseResponse | undefined = undefined;
    const token =
      authenticatedUser != undefined ? authenticatedUser.access : "token";
    await axios
      .get(`${AppConstants.baseUrl}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        promiseResponse = response.data;
      })
      .catch((error) => {
        promiseResponse = error.response.data;
        console.error(error);
      });

    return promiseResponse;
  }
}

export default AuthAPI;
