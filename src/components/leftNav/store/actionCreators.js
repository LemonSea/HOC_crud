// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance } from "../../../api/config";

export const menuList = (data) => ({
    type: actionTypes.GET_MENULIST,
    data: fromJS({
        menuList: data,
    })
});

const changeMenuList = () => ({
    type: actionTypes.CHANGE_MENULIST
});

export const getMenuList = (FormData) => {
    return async (dispatch) => {
        try {
            const result = await axiosInstance({
                method: "GET",
                url: 'authority'
            })
            // console.log(result)
            if (result.status === 0) {
                dispatch(menuList(result.data.menuList))
            } else {
                dispatch(changeMenuList())
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}