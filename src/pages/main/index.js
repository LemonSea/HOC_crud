import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import { Layout } from 'antd';
import Header from '../../components/header';
import LeftNav from '../../components/leftNav';
import './style.less';

/*
路由组件
*/
// 首页信息
import Home from '../home';
// 账号信息
import AccountInfoManage from '../accountManage/accountInfoManage';
// 修改密码
import AccountPassword from '../accountManage/accountPassword';
// 权限管理
import AuthorityManage from '../roleSysManage/authorityManage';
// 角色管理
import RoleManage from '../roleSysManage/roleManage';
// 用户管理
import UserManage from '../userManage';
// 文章状态管理
import ArticleStatusManage from '../articleManage/articleStatusManage';
// 文章类型管理
import ArticleTypeManage from '../articleManage/articleTypeManage';
// 文章审核
import ArticleAudit from '../articleAudit';
// 写文章
import ArticleWrite from '../articleWrite';

const { Footer, Sider, Content } = Layout;

function Main(props) {
    // dispatch to props
    const { } = props;
    // state to props
    const { userItem } = props;
    const userItemJS = userItem ? userItem.toJS() : [];

    if (userItemJS.loginStatus !== 0) {
        return <Redirect to='/login' />
    } else {
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header>
                    </Header>
                    <Content style={{ margin:20, backgroundColor: '#fff' }}>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/accountInfoManage' component={AccountInfoManage}></Route>
                            <Route path='/accountPassword' component={AccountPassword}></Route>
                            <Route path='/authorityManage' component={AuthorityManage}></Route>
                            <Route path='/roleManage' component={RoleManage}></Route>
                            <Route path='/userManage' component={UserManage}></Route>
                            <Route path='/articleStatusManage' component={ArticleStatusManage}></Route>
                            <Route path='/articleTypeManage' component={ArticleTypeManage}></Route>
                            <Route path='/articleAudit' component={ArticleAudit}></Route>
                            <Route path='/articleWrite' component={ArticleWrite}></Route>
                            {/* 如果上面没有匹配到，就返回Home */}
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#777' }}>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}


const mapStateToProps = (state) => ({
    userItem: state.getIn(['userList', 'userItem']),
    // loginStatus: state.getIn(['login', 'userItem', 'loginStatus']),
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main))