// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../../api/config";

const getList = (data) => ({
    type: actionTypes.GET_LIST,
    data: fromJS(data)
});


// 获取list数据
export const reqList = (pageNum, pageSize) => {
    return async (dispatch) => {
        console.log('staff')
        try {
            const result = await axiosAuthInstance({
                method: "GET",
                url: 'staff/admin/list',
                data: {
                    pageNum,
                    pageSize
                }
            })
            if (result.status === 0) {
                dispatch(getList(result.data))
            } else {
                dispatch(getList())
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}

