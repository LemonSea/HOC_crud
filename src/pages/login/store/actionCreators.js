// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance } from "../../../api/config";

export const changeLoginStatus = (data) => ({
    type: actionTypes.CHANGE_LOGINSTATUS,
    data: fromJS(data)
});

export const postLoginRequest = (Account, Password) => {
    let data = {
        "Account": Account,
        "Password": Password
    };
    return (dispatch) => {
        axiosInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: '/admin/Login/GetUserItem',
            data: data,
        })
        .then((response) => {
            // if(response === true){
            //     newStatu = 0;
            // }else{
            //     newStatu = loginStatusJS++;
            // }
            dispatch(changeLoginStatus(response))
        })
        .catch((error) => {
            console.log(error);//异常
        });
    }
}