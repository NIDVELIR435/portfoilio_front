//modules
import { Axios } from "axios";

//services
import { AxiosService } from "./axios.service";

//utils
import {
  handleAxiosSnackBarResponse,
  handleSnackBarCatch,
} from "../utils/axios-handler.util";

//types
import { Portfolio } from "../types/portfolio.type";
import { ResponseType } from "../types/snack-bar-response.type";

export class PortfolioService {
  private readonly agent: Axios;

  constructor(private readonly axiosService: AxiosService) {
    this.agent = this.axiosService.getInstance();
  }

  public create(
    requestBody: Omit<Portfolio, "id" | "createdAt" | "updatedAt">
  ): Promise<ResponseType> {
    return this.agent
      .post("portfolio/create", JSON.stringify(requestBody))
      .then(handleAxiosSnackBarResponse)
      .catch(handleSnackBarCatch);
  }

  public findAll(): Promise<Portfolio[]> {
    return this.agent
      .get<Portfolio[]>("portfolio/all")
      .then(({ data }) => data);
  }

  public findOneById(portfolioId: number): Promise<Portfolio> {
    return this.agent
      .get<Portfolio>(`portfolio/${portfolioId}`)
      .then(({ data }) => data);
  }
}
