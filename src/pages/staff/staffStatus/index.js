import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

import { Card, Table, Button, Icon } from 'antd';
import LinkButton from '../../../components/link-button'

/*
  职员类型管理
*/

class StaffStatus extends Component {

  componentWillMount() {
    this.props.getStaffStatusList()
  }

  render() {
    
    // dispatch to props
    const { getStaffStatusList } = this.props;

    // state to props
    const { staffStatusList } = this.props;
    
    const dataSource = [
      {
        "isDelete": false,
        "_id": "5e7561477fc158448c83d129",
        "name": "钟点工",
        "describe": "这是一个钟点工，按小时计费",
        "createTime": "2020-03-21T00:35:19.691Z",
        "__v": 0
      },
      {
        "isDelete": false,
        "_id": "5e75616c7fc158448c83d12a",
        "name": "月嫂",
        "describe": "这是一个月嫂，按月计费",
        "createTime": "2020-03-21T00:35:56.939Z",
        "__v": 0
      }
    ];

    const columns = [
      {
        title: '类型',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '描述',
        dataIndex: 'describe',
        key: 'describe',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        width: 300,
        render: () => (  // 返回需要线上的界面标签
          <span>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看分类</LinkButton>
          </span>
        ),
      }
    ];


    // card 的左侧标题
    const title = '员工类型';
    // card 的右侧
    const extra = (
      <Button type='primary'>
        <Icon type='plus'></Icon>
        添加
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered={true}
          rowKey='_id'
          dataSource={dataSource}
          columns={columns}
        />;
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
  staffStatusList: state.getIn(['currentUser', 'userItem', 'loginStatus']),
})

const mapDispatchToProps = (dispatch) => ({
  getStaffStatusList() {
    dispatch(actionCreators.getStaffStatusList());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StaffStatus)