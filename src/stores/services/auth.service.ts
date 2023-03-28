import { Axios, AxiosResponse } from "axios";
import { SignUpBody, User } from "../types/user.type";
import { SignInResponse } from "../types/sign-in-response.type";
import { transformResponse } from "../utils/transform-response.util";

export class AuthService {
  private readonly agent: Axios;

  constructor() {
    const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

    this.agent = new Axios({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": baseURL,
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
      transformResponse,
    });
  }

  //returns jwt token
  public signIn(requestBody: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<SignInResponse>> {
    return this.agent.post<SignInResponse>(
      "auth/sign-in",
      JSON.stringify(requestBody)
    );
  }

  //refresh jwt token
  public refreshToken(): Promise<AxiosResponse<SignInResponse>> {
    return this.agent.get<SignInResponse>("auth/refresh-token");
  }

  public signUp(requestBody: SignUpBody): Promise<AxiosResponse<User>> {
    return this.agent.post<User>("auth/sign-up", JSON.stringify(requestBody));
  }
}
