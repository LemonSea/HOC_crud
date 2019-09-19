import { axiosInstance } from "./config";

export const postLogin = () => {
  return axiosInstance.psot('/admin/Login');
}