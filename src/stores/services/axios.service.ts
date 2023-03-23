import {Axios} from "axios";
import {AuthStore} from "../auth.store";
import {get, isNil} from "lodash";


export class AxiosService {
    private readonly agent: Axios;

    constructor(private readonly authStore: AuthStore) {
        const headers: { [Key in string]: string } = {
            "Content-Type": 'application/json'
        };

        const jwt = this.authStore.getAccessToken();
        if (!isNil(jwt))
            headers['Authorization'] = `Bearer ${jwt}`;

        this.agent = new Axios({
            baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
            headers,
            transitional: {
                silentJSONParsing: true,
            },
            responseType: 'json',
            transformResponse: (data, headers) => {
                if (headers['content-type']?.includes('application/json'))
                    return JSON.parse(data);

                return data;
            }
        })

        this.agent.interceptors.request
            .use(
                (config) => {
                    if (isNil(get(config, 'headers.Authorization', null))) {
                        const jwt = this.authStore.getAccessToken();

                        if(isNil(jwt)) authStore.signOut();

                        config.headers['Authorization'] = `Bearer ${jwt}`
                    }

                    return config;
                },
                (error) => error
            );

        this.agent.interceptors.response
            .use(
                (response) => {
                    if (response.status === 401 && response.data.message === 'Unauthorized')
                        authStore.signOut();

                    return response;
                },
                (error) => error
            );


    }

    public getInstance(): Axios {
        return this.agent
    }
}
