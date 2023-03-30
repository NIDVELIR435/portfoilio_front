//modules
import React from "react";

//services
import { AuthStore } from "./auth.store";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { AxiosService } from "./services/axios.service";
import { PortfolioService } from "./services/portfolio.service";
import { ImageService } from "./services/image.service";

interface IStoreContext {
  authStore: AuthStore;
  userService: UserService;
  portfolioService: PortfolioService;
  imageService: ImageService;
}

//store
const authService = new AuthService();
const authStore = new AuthStore(authService);

//axios instance
const axiosService = new AxiosService(authStore);

//services
const userService = new UserService(axiosService);
const portfolioService = new PortfolioService(axiosService);
const imageService = new ImageService(axiosService);

export const StoreContext = React.createContext<IStoreContext>({
  authStore,
  userService,
  portfolioService,
  imageService,
});
