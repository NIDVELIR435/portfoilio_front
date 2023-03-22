import {AuthStore} from "./auth.store";
import React from "react";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {AxiosService} from "../services/axios.service";
import {PortfolioService} from "../services/portfolio.service";

interface IStoreContext {
    authStore: AuthStore;
    userService: UserService;
    portfolioService: PortfolioService;
}

const authService = new AuthService();

const authStore = new AuthStore(authService);

const axiosService = new AxiosService(authStore);

const userService = new UserService(axiosService)
const portfolioService = new PortfolioService(axiosService)

export const StoreContext = React.createContext<IStoreContext>({
    authStore,
    userService,
    portfolioService
});
