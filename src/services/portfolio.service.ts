import {Axios, AxiosResponse} from "axios";
import {SignUpBody} from "./types/user.type";

export type User = {
    "createdAt": Date,
    "updatedAt": Date,
    "id": number,
    "firstName": string,
    "lastName": string,
    "email": string,
    "password": string
};

export class PortfolioService {
    private readonly agent: Axios;

    constructor() {
        const jwt = localStorage.getItem('access_token');
        //todo add refresh
        this.agent = new Axios({
            baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
            headers: {
                "Authorization": `Bearer ${jwt}`,
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
