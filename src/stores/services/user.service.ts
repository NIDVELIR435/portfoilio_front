import {Axios, AxiosResponse} from "axios";
import {User} from "../types/user.type";
import {AxiosService} from "./axios.service";
import {LocalStorageName} from "../enums/local-storage-name.enum";
import {isNil} from "lodash";
import {makeAutoObservable} from "mobx";

export class UserService {
    public user: User | null = null;
    public userTheme : User['uiTheme'] = 'light';
    private agent: Axios;

    constructor(private readonly axiosService: AxiosService) {
        makeAutoObservable(this);
        this.agent = this.axiosService.getInstance();
        this.onInit();
    }

    private async onInit(){
        await this.defineUser();
    }

    public async defineUser(): Promise<void>{
        await this.agent.get<User>('user/info').then((response)=> {
            if(response.status === 200) {
                this.setTheme(response.data.uiTheme);
                //write to store
                this.user = response.data;
            }
        })
    }

    public getUser(): Promise<AxiosResponse<User>> {
        return this.agent.get<User>('user/info');
    }

    public updateTheme(uiTheme: User['uiTheme']): Promise<AxiosResponse<boolean>> {
        return this.agent.patch<boolean>('user/update-ui-theme', JSON.stringify({uiTheme})).then((response)=> {
            if(response.status === 200)
                this.setTheme(uiTheme);

            return response;
        });
    }

    private setTheme(uiTheme: User['uiTheme']){
        if(!isNil(uiTheme) && this.userTheme !== uiTheme){
            localStorage.setItem(LocalStorageName.USER_THEME, uiTheme);
            this.userTheme = uiTheme;
        }
    }
}
