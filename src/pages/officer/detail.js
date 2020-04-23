import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';

import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  List
} from 'antd';
import LinkButton from '../../components/link-button/index';
import { PAGE_SIZE, BASE_IMG_URL } from '../../utils/constant';
import Item from 'antd/lib/list/Item';

const Option = Select.Option;

// Product 的默认子路由组件
class OfficerDetail extends Component {

  render() {

    const { item } = this.props.location.state
    console.log(item)

    // dispatch to props
    const { } = this.props;

    // state to props
    const { } = this.props;
    // const listJS = list ? list.toJS() : [];

    const title = (
      <span>
        <LinkButton>
          <Icon
            type='arrow-left'
            style={{ color: 'green', marginRight: 15, fontSize: 20 }}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>
        <span>公司负责人详情</span>
      </span>
    )

    return (
      <Card title={title} className='staff_detail'>
        <List>
          <Item>
            <span className="left">账号:</span>
            <span>{item.account}</span>
          </Item>
          <Item>
            <span className="left">昵称:</span>
            <span>{item.nickname}</span>
          </Item>
          <Item>
            <span className="left">真实姓名:</span>
            <span>{item.realName}</span>
          </Item>
          <Item>
            <span className="left">照片:</span>
            <span>
              <img
                className='staff-img'
                alt={item.avatar}
                src={BASE_IMG_URL + item.avatar} ></img>
            </span>
          </Item>
          <Item>
            <span className="left">身份证号码：</span>
            <span>{item.IDCard}</span>
          </Item>
          <Item>
            <span className="left">性别：</span>
            <span>{item.gender === 0 ? '女' : '男'}</span>
          </Item>
          <Item>
            <span className="left">生日：</span>
            <span>{item.birthday}</span>
          </Item>
          <Item>
            <span className="left">邮箱：</span>
            <span>{item.email}</span>
          </Item>
          <Item>
            <span className="left">手机号码：</span>
            <span>{item.phone.prefix + '-' + item.phone.phone}</span>
          </Item>
          <Item>
            <span className="left">注册时间：</span>
            <span>{item.createTime}</span>
          </Item>
        </List>
      </Card>

    )
  }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(OfficerDetail))