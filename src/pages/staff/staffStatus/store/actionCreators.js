// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance } from "../../../../api/config";

const getList = (data) => ({
  type: actionTypes.GET_LIST,
  data: fromJS({
    staffStatusList: data,
  })
});

export const getStaffStatusList = (FormData) => {
  return async (dispatch) => {
      try {
          const result = await axiosInstance({
              method: "GET",
              url: 'staffStatus'
          })
          console.log(result)
          if (result.status === 0) {
              dispatch(getList(result.data.menuList))
          } else {
              dispatch(getList())
          }
      } catch (error) {
          console.log('请求出错！', error)
      }
  }
}
