// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosAuthInstance } from "../../api/config";

export const reqChangeStatus = (_id, status) => {
    try {
        console.log('_id, status', _id, status)
        return axiosAuthInstance({
            method: "PUT",
            headers: { 'Content-type': 'application/json', },
            url: 'users/admin/status',
            data: {
                _id,
                status
            },
        })
    } catch (error) {
        console.log('请求出错！', error)
    }
}