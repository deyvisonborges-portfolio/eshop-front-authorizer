import axios, { CreateAxiosDefaults, AxiosInstance } from "axios";

export function createAPI({
  withCredentials = true,
  timeout = 10000,
  ...props
}: CreateAxiosDefaults): AxiosInstance {
  const instance = axios.create({
    withCredentials,
    timeout,
    ...props,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error);
      return Promise.reject(error);
    }
  );

  return instance;
}
