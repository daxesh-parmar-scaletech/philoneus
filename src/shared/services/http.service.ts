import axios, { AxiosRequestConfig, AxiosResponse, CancelToken } from "axios";
import { API_BASE_URL } from "shared/constants";
import { getUrl } from "shared/constants/api";
import { IResponseObject } from "shared/interface";
import AuthService from "./auth.service";

let onUnauthorized: (() => void) | null = null;

export function registerUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (onUnauthorized) onUnauthorized();
    }
    return Promise.reject(error);
  }
);

interface IMiscellaneousRequestParams {
  contentType?: string;
  isPublic?: boolean;
  cancelToken?: CancelToken;
  responseType?: "arraybuffer" | "blob" | "json" | "text";
}

/**
 * get method
 * @param request object containing axios params
 */
const get = <T = unknown>(
  url: string,
  params: Record<string, unknown> = {},
  otherData: IMiscellaneousRequestParams = {}
): Promise<IResponseObject<T>> =>
  commonAxios<T>({ method: "GET", url: getUrl(url, params), ...otherData });

/**
 * post method
 * @param request object containing axios params
 */
const post = <T = unknown>(
  url: string,
  params: Record<string, unknown> = {},
  otherData: IMiscellaneousRequestParams = {}
): Promise<IResponseObject<T>> =>
  commonAxios<T>({
    method: "POST",
    url: getUrl(url),
    data: params,
    ...otherData,
  });

/**
 * put method
 * @param request object containing axios params
 */
const put = <T = unknown>(
  url: string,
  params: Record<string, unknown> = {},
  otherData: IMiscellaneousRequestParams = {}
): Promise<IResponseObject<T>> =>
  commonAxios<T>({
    method: "PUT",
    url: getUrl(url),
    data: params,
    ...otherData,
  });

/**
 * deleteRequest method
 * @param request object containing axios params
 */
const deleteRequest = <T = unknown>(
  url: string,
  params: Record<string, unknown> = {},
  otherData: IMiscellaneousRequestParams = {}
): Promise<IResponseObject<T>> =>
  commonAxios<T>({
    method: "DELETE",
    url: getUrl(url),
    data: params,
    ...otherData,
  });

/**
 * patch method
 * @param request object containing axios params
 */
const patch = <T = unknown>(
  url: string,
  params: Record<string, unknown> = {},
  otherData: IMiscellaneousRequestParams = {}
): Promise<IResponseObject<T>> =>
  commonAxios<T>({
    method: "PATCH",
    url: getUrl(url),
    data: params,
    ...otherData,
  });

interface IAxiosParams extends IMiscellaneousRequestParams {
  method: string;
  url: string;
  data?: Record<string, unknown>;
}

/**
 * commonAxios
 * @param object containing method, url, data, access token, content-type, isLogin
 */
const commonAxios = <T = unknown>(
  config: IAxiosParams
): Promise<IResponseObject<T>> => {
  const {
    method,
    url,
    data,
    contentType = "application/json",
    isPublic = false,
    responseType,
  } = config;
  const headers: Record<string, string> = {
    "Content-Type": contentType,
  };

  // if end point is public than no need to provide access token
  if (!isPublic) {
    const token = AuthService.getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  let body: unknown = null;
  if (contentType === "application/json") {
    body = JSON.stringify(data);
  } else {
    body = data;
  }

  const axiosInstanceParams: AxiosRequestConfig = {
    method: method as AxiosRequestConfig["method"],
    baseURL: API_BASE_URL,
    url: url,
    cancelToken: config.cancelToken,
    headers: headers,
    data: body,
    responseType: responseType,
  };

  return new Promise((resolve, reject) => {
    axiosInstance(axiosInstanceParams)
      .then((response: AxiosResponse<IResponseObject<T>>) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { axiosInstance };

const HttpService = {
  get: get,
  post: post,
  put: put,
  deleteRequest: deleteRequest,
  patch: patch,
};

export default HttpService;
