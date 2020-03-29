// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";

const getList = (data, total) => ({
    type: actionTypes.GET_LIST,
    list: fromJS(data),
    total: total
});
const change_SearchType = (value) => ({
    type: actionTypes.CHANGE_SEARCHTYPE,
    value: fromJS(value)
});


// 获取list数据
export const reqList = (pageNum, pageSize) => {
    return async (dispatch) => {
        try {
            const result = await axiosAuthInstance({
                method: "GET",
                url: 'staff/admin/list',
                params: {  
                    pageNum: pageNum,
                    pageSize: pageSize
                 }
            })
            if (result.status === 0) {
                dispatch(getList(result.data.list, result.data.num))
            } else {
                dispatch(getList())
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}


export const changeSearchType = (value) => {
    return (dispatch) => {
        console.log(value)
        dispatch(change_SearchType(value))
    }
}

