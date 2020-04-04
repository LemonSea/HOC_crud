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

import User from '../user/user';

// 角色授权与用户角色管理
import Authorities from '../authorities/authorities'
import Role from '../role/role';

// 公司管理
import Company from '../company/company';
import CompanyDetail from '../company/detail';
import OfficerHome from '../officer/home';
import OfficerDetail from '../officer/detail';

// 员工状态与员工管理
import Staff from '../staffList/staff';
import StaffStatus from '../staff/staffStatus/index';

// 图表示例
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

// 404 界面
import NotFound from '../not-found/not-found';

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
                            <Redirect exact from='/' to='/home' />
                            <Route path='/home' component={Home}></Route>

                            <Route path='/user' component={User}></Route>

                            <Route path='/company/company' component={Company}></Route>
                            <Route path='/company/CompanyDetail' component={CompanyDetail}></Route>
                            <Route path='/company/officerInfo' component={OfficerHome}></Route>
                            <Route path='/company/officerDetail' component={OfficerDetail}></Route>

                            <Route path='/staff/staff' component={Staff}></Route>
                            <Route path='/staff/staffStatus' component={StaffStatus}></Route>

                            <Route path='/role/role' component={Role}></Route>
                            <Route path='/role/authority' component={Authorities}></Route>

                            <Route path='/chart/Bar' component={Bar}></Route>
                            <Route path='/chart/Line' component={Line}></Route>
                            <Route path='/chart/pie' component={Pie}></Route>

                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#777' }}>家政后台管理系统</Footer>
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