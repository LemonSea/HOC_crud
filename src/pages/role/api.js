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
        const Result = axiosAuthInstance({
            method: "PUT",
            headers: { 'Content-type': 'application/json', },
            url: 'role/admin',
            data: {
                _id,
                data
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}