import {Axios} from "axios";
import {AuthStore} from "../stores/auth.store";
import {Portfolio} from "./types/portfolio.type";
import {ResponseType} from "./types/snack-bar-response.type";

export class PortfolioService {
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

    public async create(requestBody: Omit<Portfolio, "id" | "createdAt" | "updatedAt">): Promise<ResponseType> {
        try {
            const response = await this.agent.post<string>('portfolio/create', JSON.stringify(requestBody))
                .then((response) => ({
                    ...response,
                    data: JSON.parse(response.data)
                }));

            if (response.status === 201) {
                return {
                    severity: 'success',
                    message: 'Success'
                }
            }

            if (response.status === 400) {
                return {
                    severity: 'error',
                    message: 'Portfolio already exist'
                }
            }

            return {
                severity: 'warning',
                message: 'Something wrong happened during authentication'
            };
        } catch (error: unknown) {
            return {
                severity: 'error',
                message: 'Something wrong happened during authentication'
            };
        }
    }

    public findAll(): Promise<Portfolio[]> {
           return this.agent.get<string>('portfolio/all')
                .then(({data}) => JSON.parse(data));

    }
}
