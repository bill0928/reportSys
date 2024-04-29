import axios from "axios";
// import config from "@/config";
// import { CapacitorHttp } from '@capacitor/core'
// import credentialCookie from './auth/cookie'
// import { tokenIgnores } from './constant'
import { normalResponseHandler, errorResponseHandler } from "./responseHandler";
import { PostFormDataParams } from "./types";

let axioRequest:any;
// Axios Forms Multipart(multipart/form-data) Example
// https://axios-http.com/docs/post_example
export const postFormData = async <Params>({
  url,
  params,
}: PostFormDataParams<Params>) => {
  const { data } = await axios.post(url, params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

const createAxiosInstance = () => {
  // if (!config.api) throw new Error("API URL is not defined");
  if (axioRequest === undefined) {
    const instance = axios.create({
      // baseURL: config.api,
      baseURL: 'https://report-api.t1games.app/',
      withCredentials: true,
      timeout: 5000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    instance.interceptors.response.use(
      normalResponseHandler,
      errorResponseHandler
    );
    return instance;
  }

  /** 拦截器可按文档设定 */
  // instance.interceptors.request.use((config) => config)

  // return instance;
  return axioRequest;
};
// export default {
//   get: createAxiosInstance().get,
//   post: createAxiosInstance().post,
//   postForm: createAxiosInstance().postForm,
//   delete: createAxiosInstance().delete,
//   request: createAxiosInstance().request,
// }
export default { ...createAxiosInstance() };
