import {Axios, AxiosResponse} from "axios";
import {User} from "./types/user.type";
import {AxiosService} from "./axios.service";

export class UserService {
    private readonly agent: Axios;

    constructor(private readonly axiosService: AxiosService) {
        this.agent = this.axiosService.getInstance();
    }

    public getUser(): Promise<AxiosResponse<User>> {
        return this.agent.get<User>('user/info')
    }

    public updateTheme(uiTheme: Pick<User, 'uiTheme'>): Promise<AxiosResponse<boolean>> {
        return this.agent.patch<boolean>('user/update-ui-theme', JSON.stringify({uiTheme}));
    }
}
