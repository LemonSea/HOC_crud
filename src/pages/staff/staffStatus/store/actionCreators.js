// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../../api/config";

const getList = (data) => ({
    type: actionTypes.GET_LIST,
    data: fromJS({
        staffStatusList: data,
        loading: false
    })
});

const handleCancelStatus = () => ({
    type: actionTypes.SHOWSTATUS_CANCEL,
    data: 0
});
const showAddStatus = () => ({
    type: actionTypes.SHOWADD_STATUS,
    data: 1
});
const showEditStatus = () => ({
    type: actionTypes.SHOWADD_STATUS,
    data: 2
});

const setEditStaffStatus = (data) => ({
    type: actionTypes.UPDATE_LIST,
    data: data
});

const currentObj = (item) => ({
    type: actionTypes.CURRENT_OBJ,
    data: item
})

// 获取list数据
export const getStaffStatusList = () => {
    return async (dispatch) => {
        try {
            const result = await axiosAuthInstance({
                method: "GET",
                url: 'staffStatus',
            })
            if (result.status === 0) {
                dispatch(getList(result.data))
            } else {
                dispatch(getList())
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}

// 隐藏 Modal
export const handleCancel = () => {
    return (dispatch) => {
        dispatch(handleCancelStatus())
    }
}
// 显示添加 Modal
export const showAdd = () => {
    return (dispatch) => {
        dispatch(showAddStatus())
    }
}
// 显示修改 Modal
export const showEdit = () => {
    return (dispatch) => {
        dispatch(showEditStatus())
    }
}

// 保存分类对象
export const saveCurrentObj = (item) => {
    return (dispatch) => {
        dispatch(currentObj(item));
    }
}

// 添加内容
export const addStaffStatus = (data) => {
    return async (dispatch) => {
        try {
            const req = await axiosAuthInstance({
                method: "POST",
                headers: { 'Content-type': 'application/json', },
                url: 'staffStatus',
                data: {
                    data
                },
            })
            if (req.status === 0) {
                console.log(req)
                // dispatch(setEditStaffStatus(req.data.record))
                dispatch(handleCancelStatus())
            } else {
                alert('修改失败！')
                dispatch(handleCancelStatus())
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}
// 修改内容
export const editStaffStatus = (_id, formData) => {
    return async (dispatch) => {
        try {
            const req = await axiosAuthInstance({
                method: "PUT",
                headers: { 'Content-type': 'application/json', },
                url: 'staffStatus',
                data: {
                    _id: _id,
                    data: formData
                },
            })
            if (req.status === 0) {
                console.log(req)
                // dispatch(setEditStaffStatus(req.data.record))
                dispatch(handleCancelStatus())
            } else {
                alert('修改失败！')
                dispatch(handleCancelStatus())
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}
// 修改内容
export const deleteById = (_id) => {
    return async (dispatch) => {
        try {
            const req = await axiosAuthInstance({
                method: "DELETE",
                headers: { 'Content-type': 'application/json', },
                url: 'staffStatus',
                data: {
                    "id": _id
                }
            })
            if (req.status === 0) {
                console.log(req)
                // dispatch(setEditStaffStatus(req.data.record))
                dispatch(handleCancelStatus())
            } else {
                alert('修改失败！')
                dispatch(handleCancelStatus())
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}


export const PostStaffStatus = (FromData) => {
    return async (dispatch) => {
        try {
            const result = await axiosInstance({
                method: "POST",
                url: 'staffStatus',
                data: FromData
            })
            if (result.status === 0) {
                dispatch(getList(result.data))
            } else {
                dispatch(getList())
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}
