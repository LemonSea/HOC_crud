// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';
import * as storageUser from '../../../utils/storageUser';

let user = storageUser.getUser(), status = 1;
var arr = Object.keys(user);
if (arr.length !== 0) {
    storageUser.getUser()
    status = 0;
}

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    userItem: {
        user: user,
        loginStatus: status
    }
});



export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return state.set('userItem', action.data);
        case actionTypes.USER_LAYOUT:
            return state.set('userItem', action.data);
        case actionTypes.CHANGE_LOGINSTATUS:
            return state.updateIn(['userItem', 'loginStatus'], (x) => x + 1)
        default:
            return state;
    }
}