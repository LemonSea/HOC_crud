// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    list: [],  // 员工列表
    loading: true,  // 加载显示  
    total: 0, // 分页总数量
    searchType: 'name',  // 对应搜索的字段
    searchName: '',  // 搜索关键字
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_LIST:
            return state.merge({
                list: action.list,
                total: action.total,
                loading: false
            });
        case actionTypes.CHANGE_SEARCHTYPE:
            return state.set('searchType', action.value);
        case actionTypes.CHANGE_SEARCHNAME:
            return state.set('searchName', action.value);
        default:
            return state;
    }
}