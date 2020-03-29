// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    list: [],  // 员工列表
    loading: true,  // 加载显示 
    showStatus: 0,  // 添加/修改内容是否显示 0：都不显示；1：显示添加；2：显示更新,
    currentObj: {}
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_LIST:
            return state.merge({
                list: action.data,
                loading: false
            });;
        case actionTypes.SHOWADD_STATUS:
            return state.set('showStatus', action.data);
        case actionTypes.SHOWSTATUS_CANCEL:
            return state.set('showStatus', action.data);
        case actionTypes.CURRENT_OBJ:
            return state.set('currentObj', action.data);
        case actionTypes.UPDATE_LIST:
            return state.merge({
                staffStatusList: action.data,
                showStatus: 0
            });
        default:
            return state;
    }
}