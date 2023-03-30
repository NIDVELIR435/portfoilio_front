//modules
import { Axios } from "axios";

//services
import { AxiosService } from "./axios.service";

//types
import { Image } from "../types/image.type";

export class ImageService {
  private readonly agent: Axios;

  constructor(private readonly axiosService: AxiosService) {
    this.agent = this.axiosService.getInstance();
  }

  public findAllPortfolioId(portfolioId: number): Promise<Image[]> {
    return this.agent
      .get<Image[]>(`image/all/by-portfolio/${portfolioId}`)
      .then(({ data }) => data);
  }

  public createImage(
    portfolioId: number,
    body: Pick<Image, "url"> & Partial<Pick<Image, "description">>
  ): Promise<Image> {
    return this.agent
      .post<Image>(`image/upload`, JSON.stringify({ portfolioId, ...body }))
      .then(({ data }) => data);
  }

  public removeById(id: number): Promise<boolean> {
    return this.agent.delete<boolean>(`image/${id}`).then(({ data }) => data);
  }
}
