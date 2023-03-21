import {AuthStore} from "./auth.store";
import React from "react";
import {AuthService} from "../services/auth.service";

interface IStoreContext {
    authStore: AuthStore;
}

const authService = new AuthService();
//inject auth service
const authStore = new AuthStore(authService);

export const StoreContext = React.createContext<IStoreContext>({authStore});
