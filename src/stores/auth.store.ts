import {makeAutoObservable} from "mobx";
import {AuthService} from "../services/auth.service";
import {User} from "../services/types/user.type";
import {ResponseType} from "../services/types/snack-bar-response.type";
import {LocalStorageName} from "../services/enums/local-storage-name.enum";

export class AuthStore {
    public authenticated = false;

    constructor(private readonly authService: AuthService) {
        makeAutoObservable(this);
        this.setAccessToken();
    }

    public async signIn(requestBody: { email: string, password: string }): Promise<ResponseType> {
        try {
            const response = await this.authService.signIn(requestBody);

            if (response.status === 200) {
                this.writeToStore(response.data)
                return {
                    severity: 'success',
                    message: 'Success'
                }
            }

            if (response.status === 401) {
                this.signOut();
                return {
                    severity: 'error',
                    message: 'Wrong email or password'
                }
            }

            return {
                severity: 'warning',
                message: 'Something wrong happened during authentication'
            };
        } catch (error: unknown) {
            this.signOut();
            return {
                severity: 'error',
                message: 'Something wrong happened during authentication'
            };
        }
    }

    public async signUp(body: Omit<User, "id" | "createdAt" | "updatedAt" | 'uiTheme'>): Promise<ResponseType> {
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

    public getAccessToken(): string {
        return localStorage.getItem(LocalStorageName.ACCESS_TOKEN) as string;
    }

    public signOut(): void {
        localStorage.removeItem(LocalStorageName.ACCESS_TOKEN);
        this.setAuthenticate(false)
    }


    private writeToStore(token: string): void {
        localStorage.setItem(LocalStorageName.ACCESS_TOKEN, token);
        this.setAuthenticate(true);
    }

    private setAuthenticate(value: boolean): void {
        this.authenticated = value;
    }

    private setAccessToken(): void {
        this.authenticated = !!localStorage.getItem(LocalStorageName.ACCESS_TOKEN)
    }
}
