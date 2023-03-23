import {Axios, AxiosResponse} from "axios";
import {SignUpBody, User} from "../types/user.type";

export class AuthService {
    private readonly agent: Axios;

    constructor() {
        this.agent = new Axios({
            baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
            headers: {
                "Content-Type": 'application/json'
            }
        })
    }

    //returns jwt token
    public signIn(requestBody: { email: string; password: string }): Promise<AxiosResponse<string>> {
        return this.agent.post<string>('auth/sign-in',JSON.stringify(requestBody))
    }

    public signUp(requestBody: SignUpBody): Promise<AxiosResponse<User>> {
        return this.agent.post<User>('auth/sign-up', JSON.stringify(requestBody))
    }
}
