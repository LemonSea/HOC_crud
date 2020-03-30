// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";

const getList = (data, total, pageNum) => ({
    type: actionTypes.GET_LIST,
    list: fromJS(data),
    total: fromJS(total),
    pageNum: fromJS(pageNum)
});
const change_SearchType = (value) => ({
    type: actionTypes.CHANGE_SEARCHTYPE,
    value: fromJS(value)
});
const change_SearchName = (value) => ({
    type: actionTypes.CHANGE_SEARCHNAME,
    value: fromJS(value)
});
const staffType = (data) => ({
    type: actionTypes.GET_STAFFTYPELIST,
    data: fromJS(data)
});


// 获取list数据，一般分页
export const reqList = (pageNum, pageSize) => {
    return async (dispatch) => {
        console.log('reqList')
        try {
            const result = await axiosAuthInstance({
                method: "GET",
                url: 'staff/admin/list',
                params: {
                    pageNum: pageNum,
                    pageSize: pageSize
                }
            })
            if (result.status === 0) {
                dispatch(getList(result.data.list, result.data.num, result.data.pageNum))
            } else {
                dispatch(getList(result.data.list, result.data.num, result.data.pageNum))
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}
// 获取 list，搜索分页
export const searchList = (pageNum, pageSize, searchType, searchName) => {
    return async (dispatch) => {
        console.log('searchList', searchName)
        try {
            const result = await axiosAuthInstance({
                method: "GET",
                url: 'staff/admin/searchList',
                params: {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    searchType,
                    searchName
                }
            })
            if (result.status === 0) {
                dispatch(getList(result.data.list, result.data.num, result.data.pageNum))
            } else {
                dispatch(getList(result.data.list, result.data.num, result.data.pageNum))
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}
// 获取 list，搜索分页
export const changeStaffStatus = (_id, status) => {
    return async (dispatch) => {
        try {
            
            // console.log(_id, status)
            const result = await axiosAuthInstance({
                method: "PUT",
                url: 'staff/admin/staffType',
                data: {
                    _id,
                    status
                }
            })
            if (result.status === 0) {

                alert('状态更新成功！')
            } else {
                alert('状态更新失败！')
            }
        } catch (error) {
            alert('状态更新失败！')
            console.log('请求出错！', error)
        }
    }
}


export const changeSearchType = (value) => {
    return (dispatch) => {
        console.log(value)
        dispatch(change_SearchType(value))
    }
}
export const changeSearchName = (value) => {
    return (dispatch) => {
        console.log(value)
        dispatch(change_SearchName(value))
    }
}

// 获取 StaffTypeList 数据
export const getStaffType = () => {
    return async (dispatch) => {
        try {
            const result = await axiosAuthInstance({
                method: "GET",
                url: 'staffStatus/type',
            })
            if (result.status === 0) {
                dispatch(staffType(result.data))
            } else {
                dispatch(staffType())
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}


// 添加内容
export const addStaff = (data) => {
    return async (dispatch) => {
        try {
            const req = await axiosAuthInstance({
                method: "POST",
                headers: { 'Content-type': 'application/json', },
                url: 'staff/admin/list',
                data: {
                    data
                },
            })
            if (req.status === 0) {
                // console.log(req)
                // return req;
                alert('创建成功！')
            } else {
                alert('修改失败！')
                // dispatch(handleCancelStatus())
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}
// 修改内容
export const editStaff = (_id, formData) => {
    return async (dispatch) => {
        try {
            const req = await axiosAuthInstance({
                method: "PUT",
                headers: { 'Content-type': 'application/json', },
                url: 'staff/admin',
                data: {
                    _id: _id,
                    data: formData
                },
            })
            if (req.status === 0) {
                console.log(req)
                alert('创建成功！')
            } else {
                alert('创建失败！')
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}
// 删除内容
export const deleteById = (_id) => {
    return async (dispatch) => {
        try {
            const req = await axiosAuthInstance({
                method: "DELETE",
                headers: { 'Content-type': 'application/json', },
                url: 'staff/admin',
                data: {
                    "id": _id
                }
            })
            if (req.status === 0) {
                console.log(req)
                alert('删除成功！')
                // dispatch(setEditStaffStatus(req.data.record))
                // dispatch(handleCancelStatus())
            } else {
                alert('删除成功！')
                // dispatch(handleCancelStatus())
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}