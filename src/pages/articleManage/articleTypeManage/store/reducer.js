// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    articleType:[]
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_ARTICLETYPE:
            return state.set('articleType', action.data);
        default:
            return state;
    }
}