import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import moment from 'moment';

import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  Modal
} from 'antd';
import LinkButton from '../../components/link-button/index';
import { PAGE_SIZE } from '../../utils/constant';

const Option = Select.Option;

// Product 的默认子路由组件
class User extends Component {

  render() {
    // dispatch to props
    const {  } = this.props;
    
    // state to props
    const {  } = this.props;
    // const listJS = list ? list.toJS() : [];

    return (
      <div>User</div>
    )
  }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(User))