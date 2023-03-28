import { Axios } from "axios";
import { AuthStore } from "../auth.store";
import { transformResponse } from "../utils/transform-response.util";

export class AxiosService {
  private readonly agent: Axios;

  constructor(private readonly authStore: AuthStore) {
    const headers: { [Key in string]: string } = {
      "Content-Type": "application/json",
    };

    this.agent = new Axios({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      headers,
      transitional: {
        silentJSONParsing: true,
      },
      responseType: "json",
      transformResponse,
    });

    this.agent.interceptors.request.use(
      (config) => {
        const jwt = this.authStore.getAccessToken();

        config.headers["Authorization"] = `Bearer ${jwt}`;

        return config;
      },
      (error) => error
    );

    this.agent.interceptors.response.use(
      (response) => {
        if (response.status === 401 && response.data.message === "Unauthorized")
          authStore.signOut();

        return response;
      },
      (error) => error
    );
  }

  public getInstance(): Axios {
    return this.agent;
  }
}
