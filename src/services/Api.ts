import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { SignOut } from "../contexts/AuthContext";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsqueue = [];
export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: "Bearer " + cookies["nextauth.token"],
  },
});

api.interceptors.response.use(
  (success) => {
    return success;
  },
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === "token.expired") {
        cookies = parseCookies();
        const { "nextauth.refreshToken": refreshToken } = cookies;
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;
          api
            .post("/refresh", {
              refreshToken,
            })
            .then((response) => {
              const { token } = response?.data;
              setCookie(undefined, "nextauth.token", token, {
                maxAge: 60 * 60 * 24 * 30, // 30 dias,
                path: "/",
              });
              setCookie(
                undefined,
                "nextauth.refreshToken",
                response.data.refreshToken,
                {
                  maxAge: 60 * 60 * 24 * 30, // 30 dias,
                  path: "/",
                }
              );
              api.defaults.headers["Authorization"] = `Bearer ${token}`;
              failedRequestsqueue.forEach((request) =>
                request.onSuccess(token)
              );
              failedRequestsqueue = [];
            })
            .catch((err) => {
              failedRequestsqueue.forEach((request) => request.onFailure(err));
              failedRequestsqueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsqueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers["Authorization"] = `Bearer ${token}`;
              resolve(api(originalConfig)); // aguardar as requisicoes
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else {
        SignOut();
      }
    }
    return Promise.reject(error);
  }
);
