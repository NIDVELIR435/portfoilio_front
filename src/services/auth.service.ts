import {Axios, AxiosResponse} from "axios";

export type User = {
    "createdAt": Date,
    "updatedAt": Date,
    "id": number,
    "firstName": string,
    "lastName": string,
    "email": string,
    "password": string
};

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

    public signUp(requestBody: Omit<User, 'id'| 'createdAt' | 'updatedAt'>): Promise<AxiosResponse<User>> {
        return this.agent.post<User>('auth/sign-up', JSON.stringify(requestBody))
    }
}
