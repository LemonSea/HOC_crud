import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import { Link, withRouter } from 'react-router-dom';
import './style.less';
import { Menu, Icon, Button } from 'antd';
import menuList from '../../config/menuConfig';

const { SubMenu } = Menu;

function LeftNav(props) {
    // dispatch to props
    const { } = props;
    // state to props
    const { } = props;
    // const userItemJS = userItem ? userItem.toJS() : [];

    let path = props.location.pathname;

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

    const getMenuNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
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
                const cItem = item.children.find(cItem => cItem.key === path);
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
            return pre
        }, [])
    }

    return (
        <div className='left-nav'>
            <Link to='/home' className='left-nav-header'>
                <div className='left-nav-header-image'></div>
                <h1>文章管理系统</h1>
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
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

// 高阶函数 withRouter，包装非路由组件，新组件
// const LeftNav =withRouter(LeftNav);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withRouter(LeftNav)))