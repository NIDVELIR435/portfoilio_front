import {AuthStore} from "./auth.store";
import React from "react";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";

interface IStoreContext {
    authStore: AuthStore;
}

interface IServicesContext {
    userService: UserService
}


const authService = new AuthService();
//inject auth service
const authStore = new AuthStore(authService);

const userService = new UserService();

export const StoreContext = React.createContext<IStoreContext>({authStore});
//todo reimplement this. Problem here: after first init token context will list
export const ServicesContext = React.createContext<IServicesContext>({userService});
