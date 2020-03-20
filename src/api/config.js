import axios from 'axios';

export const baseUrl = 'http://localhost:8080/api/v1';

// 创建axios的实例
const axiosInstance = axios.create({
  baseURL: baseUrl,  
  validateStatus: function (status) {
    return status < 500; // 状态码在大于或等于500时才会 reject
  }
});

// 响应拦截器【响应拦截器的作用是在接收到响应后进行一些操作】
axiosInstance.interceptors.response.use(
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  res => res.data,
  // 服务器状态码大于或等于500时报错
  err => {
    console.log(err, "网络错误");
  }
);

export {
  axiosInstance
};