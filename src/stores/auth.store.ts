import {makeAutoObservable} from "mobx";
import {AuthService, User} from "../services/auth.service";
import {SeverityLevel} from "../components/snack-bar/SnackBar";

export class AuthStore {
    private authenticated = false

    constructor(private readonly authService: AuthService) {
        makeAutoObservable(this);
        this.getAccessToken();
    }

    public isAuthenticated(): boolean {
        return this.authenticated
    }

    public async signIn(requestBody: { email: string, password: string }): Promise<boolean> {
        try {
            const response = await this.authService.signIn(requestBody);

            if (response.status === 200) {
                localStorage.setItem('access_token', response.data);
                this.setAuthenticate(true);
                return true
            }
            return false;
        } catch (error: unknown) {
            this.setAuthenticate(false)
            return false;
        }
    }


    public async signUp(body: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<{
        severity: SeverityLevel;
        message: string
    }> {
        try {
            const response = await this.authService.signUp(body);

            if (response.status === 409) {
                const error = JSON.parse(response.data as unknown as string)
                return {
                    severity: 'error',
                    message: error.message
                }
            }

            if (response.status === 400) {
                const error = JSON.parse(response.data as unknown as string)
                return {
                    severity: 'error',
                    message: error.message
                }
            }
            if (response.status === 201)
                await this.signIn({email: body.email, password: body.password});

            if (this.authenticated)
                return {
                    severity: 'success',
                    message: 'User created'
                }

            return {
                severity: 'warning',
                message: 'Cannot get access token'
            }

        } catch (error: unknown) {
            return {
                severity: 'error',
                message: 'Something wrong happened during registration'
            }
        }

    }

    private getAccessToken(): void {
        this.authenticated = !!localStorage.getItem('access_token')
    }

    private setAuthenticate(value: boolean) {
        this.authenticated = value;
    }

}
