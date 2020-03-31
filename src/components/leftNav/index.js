import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import { Link, withRouter } from 'react-router-dom';
import './style.less';
import { Menu, Icon, Button } from 'antd';
// import menuList from '../../config/menuConfig';

const { SubMenu } = Menu;

function LeftNav(props) {
    // dispatch to props
    const { getMenuList } = props;
    // state to props
    const { list, user } = props;
    const menuList = list ? list.toJS() : [];
    const userJS = user ? user.toJS() : {};

    useEffect(() => {
        // console.log('getMenuList')
        getMenuList()
    }, [])

    let path = props.location.pathname;
    if (path.indexOf('/staff/staff') === 0) {
        path = '/staff/staff'
    }

    // 得到需要打开的菜单项
    let openKey;

    // 根据 menu 的数据数组，生成对应的标签数组
    const getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }>
                        {getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    // 判断当前登录用户对item有哪些权限
    const hasAuth = (item) => {
        const { key, isPublic } = item;
        const menus = userJS.role ? userJS.role.menu : [];
        const isSuperAdmin = userJS.isSuperAdmin ? userJS.isSuperAdmin : false;
        /**
         * 1.如果当前用户是 superAdmin（系统管理员)
         * 2.如果当前 item 是公开的（isPublic = true）
         * 3.当前用户有此 item 的权限：key 有没有在 menus 中
         * 4.当前用户有此 item 的某个子 item 的权限
         */
        if(isSuperAdmin || isPublic || menus.indexOf(key)!== -1) {
            return true;
        } else if(item.children) {
            return !!item.children.find(child => menus.indexOf(child.key)!== -1)
        }
        return false;
    }

    const getMenuNodes = (menuList) => {
        return menuList.reduce((pre, item) => {

            // 如果当前用户有 item 对应的权限，才显示对应的菜单项
            if (hasAuth(item)) {
                if (!item.children) {
                    pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                } else {
                    // 查找一个与当前请求路径匹配的子Item
                    // 如果存在，说明当前 Item 的子列表需要展开
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
                    if (cItem) {
                        openKey = item.key;
                    }

                    pre.push((
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </span>
                            }>
                            {getMenuNodes(item.children)}
                        </SubMenu>
                    ))
                }
            }

            return pre
        }, [])
    }

    return (
        <div className='left-nav'>
            <Link to='/home' className='left-nav-header'>
                <div className='left-nav-header-image'></div>
                <h1>后台管理系统</h1>
            </Link>
            <Menu
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
                mode="inline"
                theme="dark"
            >
                {
                    getMenuNodes(menuList)
                }
            </Menu>
        </div>
    )
}


const mapStateToProps = (state) => ({
    list: state.getIn(['menuList', 'menuList', 'menuList']),
    user: state.getIn(['userList', 'userItem', 'user']),
})

const mapDispatchToProps = (dispatch) => {
    return {
        getMenuList() {
            dispatch(actionCreators.getMenuList());
        }
    }
}

// 高阶函数 withRouter，包装非路由组件，新组件
// const LeftNav =withRouter(LeftNav);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withRouter(LeftNav)))