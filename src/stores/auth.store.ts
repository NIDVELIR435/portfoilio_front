import {makeAutoObservable} from "mobx";
import {AuthService} from "../services/auth.service";

export class AuthStore {
    private authenticated = false

    constructor(private readonly authService: AuthService) {
        makeAutoObservable(this);
        this.getAccessToken();
    }

    public isAuthenticated(): boolean {
        return this.authenticated
    }

    public async signIn(requestBody: { email: string, password: string }): Promise<void> {
        try {
            const response = await this.authService.signIn(requestBody);

            if (response.status === 200) {
                localStorage.setItem('access_token', response.data);
                this.setAuthenticate(true);
            }
            return;
        } catch (error: unknown) {
            this.setAuthenticate(false)
            return;
        }

    }

    private getAccessToken(): void {
        this.authenticated = !!localStorage.getItem('access_token')
    }

    private setAuthenticate(value: boolean) {
        this.authenticated = value;
    }
}
