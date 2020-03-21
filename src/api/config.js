import axios from 'axios';
import {createHashHistory } from 'history';
import * as storageToken from '../utils/storageToken';
import * as storageUser from '../utils/storageUser';

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

// token 验证
const axiosAuthInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,  // 请求超时时间
});
// request 拦截器
axiosAuthInstance.interceptors.request.use(
  config => {
    config.headers = {'x-auth-token': storageToken.getToken()}
    return config
  },
  err => {
    return Promise.reject(err)
  })
// response 拦截器
axiosAuthInstance.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    if (error) {
      // 请求配置发生的错误
      if (!error.response) {
        return console.log('Error', error.message);
      }

      // 获取状态码
      const status = error.response.status;
      const text = error.response.data;
      console.log(status)

      // 提示错误信息
      
      // 错误状态处理
      if (status === 400) {
        console.log(status, text)
        storageToken.removeToken();
        storageUser.removeUser();
        alert(text)
        window.location.href = 'http://localhost:3000/login';
      } else if (status === 403) {
        console.log(status, text)
        // createHashHistory().push('/login');
      } else if (status >= 404 && status < 422) {
        console.log(status, text)
        // createHashHistory().push('/login');
      }
    }
    return Promise.reject(error);
  }
);

export {
  axiosInstance,
  axiosAuthInstance
};