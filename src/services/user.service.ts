import {Axios, AxiosResponse} from "axios";
import {User} from "./types/user.type";
import {AuthStore} from "../stores/auth.store";

export class UserService {
    private readonly agent: Axios;

    constructor(private readonly authStore: AuthStore) {
        const jwt = this.authStore.getAccessToken();
        this.agent = new Axios({
            baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-Type": 'application/json'
            },
            responseType: 'json'
        })
    }

    public getUser(): Promise<AxiosResponse<User>> {
        return this.agent.get<string>('user/info').then((response) => ({...response, data: JSON.parse(response.data)}));
    }

    public updateTheme(uiTheme: Pick<User, 'uiTheme'>): Promise<AxiosResponse<boolean>> {
        return this.agent.patch<boolean>('user/update-ui-theme', JSON.stringify({uiTheme}));
    }
}
