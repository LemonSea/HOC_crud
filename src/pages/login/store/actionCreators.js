// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance } from "../../../api/config";
import * as storageUser from '../../../utils/storageUser';

export const userLogin = (data) => ({
    type: actionTypes.USER_LOGIN,
    data: fromJS({
        user: data,
        loginStatus: 0
    })
});

const changeLoginState = () => ({
    type: actionTypes.CHANGE_LOGINSTATUS
});


const changeLayoutState = () => ({
    type: actionTypes.USER_LAYOUT,
    data: fromJS({
        user: [],
        loginStatus: 1
    })
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
                storageUser.removeUser()
                storageUser.setUser(data)
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

export const postLayoutRequest = () => {
    return (dispatch) => {
        console.log('creators')
        storageUser.removeUser()
        dispatch(changeLayoutState())
    }
}
