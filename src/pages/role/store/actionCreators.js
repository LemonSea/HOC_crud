// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";

const setList = (data, total, pageNum) => ({
  type: actionTypes.GET_LIST,
  list: fromJS(data)
});

// 获取 StaffTypeList 数据
export const getList = () => {
  return async (dispatch) => {
      try {
          const result = await axiosAuthInstance({
              method: "GET",
              url: 'role/admin/list',
          })
          if (result.status === 0) {
            console.log(result.data)
            console.log(result.data)
              dispatch(setList(result.data))
          } else {
              dispatch(setList())
          }
      } catch (error) {
          console.log('请求出错！', error)
      }
  }
}

// 添加内容
export const addRole = (data) => {
  return async (dispatch) => {
      try {
          const req = await axiosAuthInstance({
              method: "POST",
              headers: { 'Content-type': 'application/json', },
              url: 'role/admin',
              data: {
                  data
              },
          })
          if (req.status === 0) {
              console.log(req)
              alert('创建成功!')
          } else {
              alert('创建失败！')
              // dispatch(handleCancelStatus())
          }
      } catch (error) {
          console.log('请求出错！', error)
      }
  }
}