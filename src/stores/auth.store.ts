import { makeAutoObservable } from "mobx";
import { AuthService } from "./services/auth.service";
import { User } from "./types/user.type";
import { ResponseType } from "./types/snack-bar-response.type";
import { LocalStorageName } from "./enums/local-storage-name.enum";
import { AxiosError } from "axios";

export class AuthStore {
  public authenticated = false;

  constructor(private readonly authService: AuthService) {
    makeAutoObservable(this);
    this.setAccessToken();
  }

  public async signIn(requestBody: {
    email: string;
    password: string;
  }): Promise<ResponseType> {
    try {
      const { status, data } = await this.authService.signIn(requestBody);

      if (status === 200) {
        await this.writeToStore(data.accessToken);
        this.writeToCookie(data.refreshToken);

        return {
          severity: "success",
          message: "Success",
        };
      }

      if (status === 401) {
        this.signOut();
        return {
          severity: "error",
          message: "Wrong email or password",
        };
      }

      return {
        severity: "warning",
        message: "Something wrong happened during authentication",
      };
    } catch (error: unknown) {
      this.signOut();
      return {
        severity: "error",
        message: "Something wrong happened during authentication",
      };
    }
  }

  public refreshToken() {
    return this.authService
      .refreshToken()
      .then(async ({ data, status }) => {
        if (status === 200) {
          await this.writeToStore(data.accessToken);
          this.writeToCookie(data.refreshToken);
          return {
            severity: "success",
            message: "Success",
          };
        }
      })
      .catch((error: AxiosError) => {
        this.signOut();
        throw new Error(error.message);
      });
  }

  public async signUp(
    body: Omit<User, "id" | "createdAt" | "updatedAt" | "uiTheme">
  ): Promise<ResponseType> {
    try {
      const response = await this.authService.signUp(body);

      if (response.status === 409) {
        const error = JSON.parse(response.data as unknown as string);
        return {
          severity: "error",
          message: error.message,
        };
      }

      if (response.status === 400) {
        const error = JSON.parse(response.data as unknown as string);
        return {
          severity: "error",
          message: error.message,
        };
      }
      if (response.status === 201)
        await this.signIn({ email: body.email, password: body.password });

      if (this.authenticated)
        return {
          severity: "success",
          message: "User created",
        };

      return {
        severity: "warning",
        message: "Cannot get access token",
      };
    } catch (error: unknown) {
      return {
        severity: "error",
        message: "Something wrong happened during registration",
      };
    }
  }

  public getAccessToken(): string {
    return localStorage.getItem(LocalStorageName.ACCESS_TOKEN) as string;
  }

  public signOut(): void {
    localStorage.removeItem(LocalStorageName.ACCESS_TOKEN);
    this.setAuthenticate(false);
  }

  private writeToStore(token: string): Promise<void> {
    return Promise.resolve()
      .then(() => {
        localStorage.removeItem(LocalStorageName.ACCESS_TOKEN);
      })
      .then(() => {
        localStorage.setItem(LocalStorageName.ACCESS_TOKEN, token);
      })
      .then(() => {
        this.setAuthenticate(true);
      });
  }

  private writeToCookie(refreshToken: string): void {
    document.cookie = `refresh_token=${refreshToken}`;
  }

  private setAuthenticate(value: boolean): void {
    this.authenticated = value;
  }

  private setAccessToken(): void {
    this.authenticated = !!localStorage.getItem(LocalStorageName.ACCESS_TOKEN);
  }
}
