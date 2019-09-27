import { axiosInstance } from "./config";

export const postLoginRequest = () => {
  return axiosInstance.psot('/admin/Login');
}