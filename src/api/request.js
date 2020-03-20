import { axiosInstance } from "./config";

export const aipRequest = () => {
  return axiosInstance.psot('/api/v1');
}