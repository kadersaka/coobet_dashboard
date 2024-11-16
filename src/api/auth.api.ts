import User, { UserJson } from "@/models/user.model";
import AppConstants from "@/utils/constants.util";
import axios from "axios";

axios.defaults.withCredentials = true;

interface AuthPromiseResponse {
  data?: UserJson;
  refresh?: string;
  access?: string;
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
  static async register(data: User): Promise<AuthPromiseResponse | undefined> {
    let promiseResponse: AuthPromiseResponse | undefined = undefined;

    await axios
      .post(`${AppConstants.baseUrl}/auth/register`, data.toJson())
      .then((response) => {
        promiseResponse = response.data;
      })
      .catch((error) => {
        promiseResponse = error.response.data;
        console.error(error);
      });

    return promiseResponse;
  }

  static async login(data: AuthData): Promise<AuthPromiseResponse | undefined> {
    let promiseResponse: AuthPromiseResponse | undefined = undefined;
    console.log("Login");

    console.log("URL", `http://api.coobet.codelabbenin.com/auth/login `);

    await axios
      .post(`http://api.coobet.codelabbenin.com/auth/login`, data, {
        withCredentials: true,
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
