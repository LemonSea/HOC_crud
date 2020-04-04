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

    let statusText;
    if(item.status === 0) {
      statusText = '待审核'
    } else if(item.status === 1) {
      statusText = '审核通过'
    } else {
      statusText = '审核不通过'
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
            <span className="left">公司名称:</span>
            <span>{item.name}</span>
          </Item>
          <Item>
            <span className="left">公司描述:</span>
            <span>{item.describe}</span>
          </Item>
          <Item>
            <span className="left">公司地址:</span>
            <span>{item.address}</span>
          </Item>
          <Item>
            <span className="left">公司照片:</span>
            <span>
              {item.imgs.map((item, index) => {
                return (
                  // < Option key={item.name} value={item.name}>{item.name}</Option>
                  <img
                    key={item}
                    className='staff-img'
                    alt={item.name}
                    src={BASE_IMG_URL + item} ></img>
                )
              })}
            </span>
          </Item>
          <Item>
            <span className="left">邮箱：</span>
            <span>{item.email}</span>
          </Item>
          <Item>
            <span className="left">公司客服-1：</span>
            <span>{item.phone1.prefix1 + item.phone1.phone1}</span>
          </Item>
          <Item>
            <span className="left">公司客服-3：</span>
            <span>{item.phone2.prefix2 + item.phone2.phone2}</span>
          </Item>
          <Item>
            <span className="left">公司客服-2：</span>
            <span>{item.phone3.prefix3 + item.phone3.phone3}</span>
          </Item>
          <Item>
            <span className="left">公司员工数量：</span>
            <span>{item.staffCount}</span>
          </Item>
          <Item>
            <span className="left">公司状态：</span>
            <span>{statusText}</span>
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