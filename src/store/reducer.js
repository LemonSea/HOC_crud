// 合并 reducer 函数
import { combineReducers } from 'redux-immutable';
// 导入分仓库的 reducer
import { reducer as loginReducer } from '../pages/login/store';
import { reducer as menuListReducer } from '../components/leftNav/store';
import { reducer as staffStatusReducer } from '../pages/staff/staffStatus/store';
import { reducer as authoritiesReducer } from '../pages/authorities/store';
import { reducer as staffReducer } from '../pages/staffList/store';
import { reducer as roleReducer } from '../pages/role/store';
// import { reducer as articleStatusReducer } from '../pages/articleManage/articleStatusManage/store';
// import { reducer as articleTypeReducer } from '../pages/articleManage/articleTypeManage/store';

// 合并 reducer 函数为一个 obj
// export default  combineReducers({
//     login: loginReducer
// })
const reducer = combineReducers({
    // login: loginReducer,
    userList: loginReducer,
    menuList: menuListReducer,
    staffStatusList: staffStatusReducer,
    authoritiesReducer,
    staffReducer,
    roleReducer
})

export default reducer
