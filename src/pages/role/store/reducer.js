// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    list: [],  // 员工列表
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_LIST:
            return state.set('list', action.list);
        default:
            return state;
    }
}