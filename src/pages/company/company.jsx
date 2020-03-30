import React, { Component } from 'react';
import { Card, Table, Button, Icon } from 'antd';

/*
  角色路由
*/

export default class Company extends Component {
  render() {
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        company: '拥有集团',
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        company: '阅文集团',
        address: '西湖区湖底公园1号',
      },
    ];

    const columns = [
      {
        title: '公司负责人',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '员工数量',
        dataIndex: 'company',
        key: 'company',
      },
      {
        title: '公司',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '公司地址',
        dataIndex: 'address',
        key: 'address',
      },{
        title: '公司状态',
        render: (item) => {
          // const {status, _id } = item;
          const newStatus =  0;
          // console.log(item)
          return (
            <span>
              {/* <span style={{marginRight: 30}}>当前状态：{status === 0 ? '空闲' : '忙碌'}</span> */}
              <Button
                style={{marginRight: -30}}
                type={newStatus === 0 ? 'primary' : 'primary'}
                onClick={() => this.props.changeStaffStatus( newStatus)}
              >
                {newStatus === 0 ? '审核通过' : '工作完成'}
              </Button>
            </span>
          )
        }
      },
    ];


    // card 的左侧标题
    const title = '公司管理';
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
          dataSource={dataSource}
          columns={columns}
        />;
      </Card>
    )

  }
}