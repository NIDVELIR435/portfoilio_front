import { AxiosResponseHeaders } from "axios";

export const transformResponse = (data: any, headers: AxiosResponseHeaders) => {
  if (headers["content-type"]?.includes("application/json"))
    return JSON.parse(data);

  return data;
};
