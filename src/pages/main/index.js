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
import Role from '../role/role';
import Authority from '../role/authority';

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
                            <Route path='/role/role' component={Role}></Route>
                            <Route path='/role/authority' component={Authority}></Route>
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