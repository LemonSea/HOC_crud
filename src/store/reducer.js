// 合并 reducer 函数
import { combineReducers } from 'redux-immutable';
// 导入分仓库的 reducer
import { reducer as loginReducer } from '../pages/login/store';
import { reducer as menuList } from '../components/leftNav/store';
// import { reducer as articleStatusReducer } from '../pages/articleManage/articleStatusManage/store';
// import { reducer as articleTypeReducer } from '../pages/articleManage/articleTypeManage/store';

// 合并 reducer 函数为一个 obj
// export default  combineReducers({
//     login: loginReducer
// })
const reducer = combineReducers({
    // login: loginReducer,
    userList: loginReducer,
    menuList: menuList
})

export default reducer
