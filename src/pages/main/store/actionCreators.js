// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance } from "../../../api/config";

export const userLogin = (data) => ({
    type: actionTypes.USER_LOGIN,
    data: fromJS({
        user: data,
        loginStatus: 0
    })
});

export const changeLoginState = () => ({
    type: actionTypes.CHANGE_LOGINSTATUS
});

export const postLoginRequest = (FormData) => {
    return (dispatch) => {
        axiosInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: '/admin/Login/Login',
            data: FormData,
        }).then((res) => {
            let data;
            if (res.code === 200 && res.returnStatus === 1) {
                // 登录成功
                data = res.result;
                dispatch(userLogin(data))
            } else if (res.code === 200 && res.returnStatus === 0) {
                // 登录失败
                dispatch(changeLoginState())
            }
        }).catch((error) => {
            console.log(error);//异常
        });
    }
}