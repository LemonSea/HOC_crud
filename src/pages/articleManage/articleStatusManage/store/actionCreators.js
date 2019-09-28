// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance } from "../../../../api/config";

export const getArticleStatus = (data) => ({
    type: actionTypes.GET_ARTICLESTATUS,
    data: fromJS(data)
});


export const getArticleStatusRequest = (FormData) => {
    return (dispatch) => {
        axiosInstance({
            method: "GET",
            headers: { 'Content-type': 'application/json', },
            url: '/admin/ArticleStatus/GetAllList'
        }).then((res) => {
            let data;
            if (res.code === 200 && res.returnStatus === 1) {
                data = res.result;
                dispatch(getArticleStatus(data))
            } else if (res.code === 200 && res.returnStatus === 0) {
                // 登录失败
                // dispatch(changeLoginState())
            }
        }).catch((error) => {
            console.log(error);//异常
        });
    }
}