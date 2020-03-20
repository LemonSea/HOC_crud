// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance } from "../../../api/config";
import * as storageUser from '../../../utils/storageUser';
import * as storageToken from '../../../utils/storageToken';

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
    return async (dispatch) => {
        try {
            const reqAdminLogin = await axiosInstance({
                method: "POST",
                headers: { 'Content-type': 'application/json', },
                url: 'users/admin/login',
                data: FormData,
            })
            if (reqAdminLogin.status === 0) {
                // 登录成功 
                storageUser.removeUser()
                storageToken.removeToken()
                storageUser.setUser(reqAdminLogin.data)
                storageToken.setToken(reqAdminLogin.token)
                dispatch(userLogin(reqAdminLogin.data))
            } else {
                // 登录失败
                dispatch(changeLoginState())
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}

export const postLayoutRequest = () => {
    return (dispatch) => {
        storageUser.removeUser()
        storageToken.removeToken()
        dispatch(changeLayoutState())
    }
}
