// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";


const getList = (data, total, pageNum) => ({
  type: actionTypes.GET_LIST,
  list: fromJS(data),
  total: fromJS(total),
  pageNum: fromJS(pageNum)
});

// 获取list数据，一般分页
export const reqList = (pageNum, pageSize) => {
  return async (dispatch) => {
    //   console.log('reqList')
      try {
          const result = await axiosAuthInstance({
              method: "GET",
              url: 'company/admin/officer',
              params: {
                  pageNum: pageNum,
                  pageSize: pageSize
              }
          })
          if (result.status === 0) {
            console.log('result.data', result.data)
              dispatch(getList(result.data.list, result.data.num, result.data.pageNum))
          } else {
              dispatch(getList(result.data.list, result.data.num, result.data.pageNum))
          }
      } catch (error) {
          console.log('请求出错！', error)
      }
  }
}