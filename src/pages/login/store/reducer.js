// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    User: [],
    loginStatus: 1
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LOGINSTATUS:
            return state.set('loginStatus', action.data);
        default:
            return state;
    }
}