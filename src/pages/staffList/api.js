// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosAuthInstance } from "../../api/config";


export const reqCompany = (_id) => {
    try {
        console.log('_id', _id)
        return axiosAuthInstance({
            method: "GET",
            headers: { 'Content-type': 'application/json', },
            url: 'company/getOfficer',
            params: {
                _id
            },
        })
    } catch (error) {
        console.log('请求出错！', error)
    }
}
