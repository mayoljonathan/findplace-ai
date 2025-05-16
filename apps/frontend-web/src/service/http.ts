import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";
import { ApiError } from "../types";

export class HttpService extends Axios {
  constructor(config?: AxiosRequestConfig) {
    super(config);
    const instance = axios.create(config);

    instance.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError) => {
        if (
          typeof error.response?.data === "object" &&
          "error" in (error.response?.data as ApiError)
        ) {
          return Promise.reject(error.response?.data as ApiError);
        }

        return Promise.reject({
          error: error.name,
          message: error.message,
          statusCode: error.response?.status!,
        } satisfies ApiError);
      }
    );

    return instance;
  }
}
