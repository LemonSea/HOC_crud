// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosAuthInstance } from "../../api/config";


export const reqAddRole = (data) => {
    try {
        const Result = axiosAuthInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: 'role/admin',
            data: {
                data
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}
export const reqUpdateRole = (_id, data) => {
    try {
        console.log('reqUpdateRole-data', data)
        return axiosAuthInstance({
            method: "PUT",
            headers: { 'Content-type': 'application/json', },
            url: 'role/auth',
            data: {
                _id,
                menu: data
            },
        })
    } catch (error) {
        console.log('请求出错！', error)
    }
}
export const reqDeleteRole = (_id) => {
    try {
        return axiosAuthInstance({
            method: "DELETE",
            headers: { 'Content-type': 'application/json', },
            url: 'role',
            data: {
                _id
            },
        })
    } catch (error) {
        console.log('请求出错！', error)
    }
}
export const reqChangeStatus = (_id) => {
    try {
        return axiosAuthInstance({
            method: "DELETE",
            headers: { 'Content-type': 'application/json', },
            url: 'role',
            data: {
                _id
            },
        })
    } catch (error) {
        console.log('请求出错！', error)
    }
}