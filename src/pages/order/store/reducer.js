// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    list: [],  // 员工列表
    loading: true,  // 加载显示  
    total: 0, // 分页总数量
    pageNum: 1,
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_LIST:
            return state.merge({
                list: action.list,
                total: action.total,
                pageNum: action.pageNum,
                loading: false
            });
        default:
            return state;
    }
}