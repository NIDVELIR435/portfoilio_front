import { Axios } from "axios";
import { Portfolio } from "../types/portfolio.type";
import { ResponseType } from "../types/snack-bar-response.type";
import { AxiosService } from "./axios.service";

export class PortfolioService {
  private readonly agent: Axios;

  constructor(private readonly axiosService: AxiosService) {
    this.agent = this.axiosService.getInstance();
  }

  public async create(
    requestBody: Omit<Portfolio, "id" | "createdAt" | "updatedAt">
  ): Promise<ResponseType> {
    try {
      const response = await this.agent.post<Portfolio>(
        "portfolio/create",
        JSON.stringify(requestBody)
      );

      if (response.status === 201) {
        return {
          severity: "success",
          message: "Success",
        };
      }

      if (response.status === 400) {
        return {
          severity: "error",
          message: "Portfolio already exist",
        };
      }

      return {
        severity: "warning",
        message: "Something wrong happened during authentication",
      };
    } catch (error: unknown) {
      return {
        severity: "error",
        message: "Something wrong happened during authentication",
      };
    }
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
