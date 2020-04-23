// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosAuthInstance } from "../../api/config";

export const reqChangeOrder = (_id, status) => {
    try {
        console.log('reqFinishOrder-status', status)
        return axiosAuthInstance({
            method: "PUT",
            headers: { 'Content-type': 'application/json', },
            url: 'order/admin/orderStatus',
            data: {
                _id,
                status
            },
        })
    } catch (error) {
        console.log('请求出错！', error)
    }
}