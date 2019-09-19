import { axiosInstance } from "./config";

export const getTodo = () => {
  return axiosInstance.get('/api/Todo');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}