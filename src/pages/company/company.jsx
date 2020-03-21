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
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];


    // card 的左侧标题
    const title = '一级分类列表';
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