import { AxiosResponse } from "axios";

//types
import { ResponseType } from "../types/snack-bar-response.type";

//utils
import { isNil } from "lodash";
import { Portfolio } from "../types/portfolio.type";
import { AxiosError } from "axios/index";

const commonAnswer: ResponseType = {
  severity: "warning",
  message: "Something wrong happened during authentication",
};

export const handleAxiosSnackBarResponse = (
  response: AxiosResponse
): ResponseType => {
  if (!isNil(response)) {
    const status = response.status;
    if (status === 201) return { severity: "success", message: "Success" };

    if (status === 409)
      return { severity: "error", message: "Portfolio already exist" };

    if (status >= 500)
      return {
        severity: "warning",
        message: "Something wrong happened during request send on server side",
      };
  }

  return commonAnswer;
};

export const handleAxiosSnackBarRequest = (request: unknown): ResponseType => {
  if (!isNil(request))
    return {
      severity: "warning",
      message: "Something wrong happened during request send on frontend side",
    };

  return commonAnswer;
};

export const handleSnackBarCatch = <ResponseBody extends Portfolio>({
  request,
  response,
}: AxiosError<ResponseBody>): ResponseType => {
  if (!isNil(response)) return handleAxiosSnackBarResponse(response);

  if (!isNil(request)) return handleAxiosSnackBarRequest(request);

  return {
    severity: "warning",
    message: "Something wrong happened during authentication",
  };
};
