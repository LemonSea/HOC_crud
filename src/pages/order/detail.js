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
class OrderDetail extends Component {


  render() {

    const { item } = this.props.location.state
    console.log(item)

    let statusText;
    if(item.status === 0) {
      statusText = '待支付'
    } else if(item.status === 1) {
      statusText = '已支付，待完成'
    } else if(item.status === 2) {
      statusText = '已完成，待评论'
    }else if(item.status === 3) {
      statusText = '完成'
    } else {
      statusText = '已取消'
    }

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
        <span>公司详情</span>
      </span>
    )

    return (
      <Card title={title} className='staff_detail'>
        <List>
          <Item>
            <span className="left">订单编号:</span>
            <span>{item._id}</span>
          </Item>
          <Item>
            <span className="left">消费者:</span>
            <span>{item.user.nickname}</span>
          </Item>
          <Item>
            <span className="left">服务人员:</span>
            <span>{item.employee.name}</span>
          </Item>
          <Item>
            <span className="left">服务公司:</span>
            <span>{item.company.name}</span>
          </Item>
          <Item>
            <span className="left">服务地址:</span>
            <span>{item.address}</span>
          </Item>
          <Item>
            <span className="left">消费者电话:</span>
            <span>{item.phone.prefix + '+' +item.phone.phone}</span>
          </Item>
          <Item>
            <span className="left">消费者金额:</span>
            <span>{item.amount}</span>
          </Item>
          <Item>
            <span className="left">预约开始时间:</span>
            <span>{item.startTime}</span>
          </Item>
          <Item>
            <span className="left">预约结束时间:</span>
            <span>{item.endTime}</span>
          </Item>
          {/* <Item>
            <span className="left">总预约时间:</span>
            <span>{item.countTime.countHours}</span>
          </Item> */}
          <Item>
            <span className="left">订单状态：</span>
            <span>{statusText}</span>
          </Item>
          <Item>
            <span className="left">备注：</span>
            <span>{item.note}</span>
          </Item>
          <Item>
            <span className="left">下单时间：</span>
            <span>{item.firstTime}</span>
          </Item>
          <Item>
            <span className="left">支付时间：</span>
            <span>{item.payTime}</span>
          </Item>
          <Item>
            <span className="left">完成时间：</span>
            <span>{item.completionTime}</span>
          </Item>
          <Item>
            <span className="left">服务满意度：</span>
            <span>{item.satisfaction}</span>
          </Item>
          <Item>
            <span className="left">服务评价：</span>
            <span>{item.evaluation}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(OrderDetail))