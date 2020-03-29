import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import StaffHome from './home';
import StaffAddUpdate from './add-update';
import StaffDetail from './detail';
import './staff.less';

// Product 的默认子路由组件
class Staff extends Component {
  render() {
    return (
      <Switch>
        <Route path='/staff/staff' exact component={StaffHome} />
        <Route path='/staff/staff/addUpdate' component={StaffAddUpdate} />
        <Route path='/staff/staff/detail' component={StaffDetail} />
        {/* <Redirect to='/staff' /> */}
      </Switch>
    )
  }
}

export default Staff;