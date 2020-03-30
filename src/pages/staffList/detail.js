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
class StaffDetail extends Component {

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
        <span>员工详情</span>
      </span>
    )

    return (
      <Card title={title} className='staff_detail'>
        <List>
          <Item>
            <span className="left">员工名称:</span>
            <span>{item.name}</span>
          </Item>
          <Item>
            <span className="left">员工类型：</span>
            <span>{item.name}</span>
          </Item>
          <Item>
            <span className="left">所属公司：</span>
            <span>{item.name}</span>
          </Item>
          <Item>
            <span className="left">费用：</span>
            <span>{item.costHour}</span>
          </Item>
          <Item>
            <span className="left">当前员工状态：</span>
            <span>{item.status}</span>
          </Item>
          <Item>
            <span className="left">工号：</span>
            <span>{item.workNumber}</span>
          </Item>
          <Item>
            <span className="left">身份证号码：</span>
            <span>{item.IDCard}</span>
          </Item>
          <Item>
            <span className="left">照片:</span>
            <span>
              {item.imgs.map((item, index) => {
                return (
                  // < Option key={item.name} value={item.name}>{item.name}</Option>
                  <img
                    key={item.name+item.url}
                    className='staff-img'
                    alt={item.name}
                    src={BASE_IMG_URL + item.url} ></img>
                )
              })}
            </span>
          </Item>
          <Item>
            <span className="left">性别：</span>
            <span>{item.gender}</span>
          </Item>
          <Item>
            <span className="left">年龄：</span>
            <span>{item.age}</span>
          </Item>
          <Item>
            <span className="left">入职时间：</span>
            <span>{item.inductionTime}</span>
          </Item>
          <Item>
            <span className="left">家庭地址：</span>
            <span>{item.address}</span>
          </Item>
          <Item>
            <span className="left">星级:</span>
            <span>{item.star}</span>
          </Item>
          <Item>
            <span className="left">订单总数</span>
            <span>{item.orderCount}</span>
          </Item>
          <Item>
            <span className="left">好评订单数</span>
            <span>{item.highPraiseOrder}</span>
          </Item>
          <Item>
            <span className="left">差评订单数</span>
            <span>{item.badReviewOrder}</span>
          </Item>
          <Item>
            <span className="left">介绍:</span>
            <span dangerouslySetInnerHTML={{ __html: item.introduction }}>

            </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(StaffDetail))