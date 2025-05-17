import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";
import { ApiError } from "../types";
import { API_KEY } from "../config/constants";

export class HttpService extends Axios {
  constructor(config?: AxiosRequestConfig) {
    const resolvedConfig = {
      ...config,
      headers: {
        ...config?.headers,
        "x-api-key": API_KEY,
      },
    };

    super(resolvedConfig);
    const instance = axios.create(resolvedConfig);

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
