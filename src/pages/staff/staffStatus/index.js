import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

import { Card, Table, Button, Icon, Modal } from 'antd';
import LinkButton from '../../../components/link-button';

import AddForm from './add-form';

/*
  职员类型管理
*/
function StaffStatus(props) {

  // dispatch to props
  const { getStaffStatusList } = props;
  // dispathc to props by Modal
  const { showAdd, handleCancel, showEdit, addStaffStatus, editStaffStatus } = props;

  // state to props
  const { staffStatusList, loading, showStatus } = props;
  const staffStatusListJS = staffStatusList ? staffStatusList.toJS() : [];

  useEffect(() => {
    console.log('getMenuList')
    getStaffStatusList()
  }, [])

  // list 内容
  const dataSource = staffStatusListJS;
  // list 标题
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
      title: '创建者',
      dataIndex: 'creator',
      key: 'creator',
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
          <LinkButton onClick={showEdit}>修改分类</LinkButton>
          <LinkButton>删除分类</LinkButton>
        </span>
      ),
    }
  ];


  // card 的左侧标题
  const title = '员工类型';
  // card 的右侧
  const extra = (
    <Button type='primary' onClick={showAdd}>
      <Icon type='plus'></Icon>
        添加
    </Button>
  )

  return (
    <Card title={title} extra={extra}>
      <Table
        bordered={true}
        rowKey='_id'
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
      />;

      <Modal
        title="添加分类"
        visible={showStatus === 1}
        onOk={addStaffStatus}
        onCancel={handleCancel}
      >
        <AddForm />
      </Modal>

      <Modal
        title="修改分类"
        visible={showStatus === 2}
        onOk={editStaffStatus}
        onCancel={handleCancel}
      >
        修改分类
      </Modal>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
  staffStatusList: state.getIn(['staffStatusList', 'staffStatusList', 'staffStatusList']),
  loading: state.getIn(['staffStatusList', 'staffStatusList', 'loading']),
  showStatus: state.getIn(['staffStatusList', 'showStatus']),
})

const mapDispatchToProps = (dispatch) => ({
  getStaffStatusList() {
    dispatch(actionCreators.getStaffStatusList());
  },
  handleCancel() {
    dispatch(actionCreators.handleCancel());
  },
  showAdd() {
    dispatch(actionCreators.showAdd());
  },
  showEdit() {
    dispatch(actionCreators.showEdit());
  },
  addStaffStatus() {
    console.log('addStaffStatus')
  },
  editStaffStatus() {
    console.log('editStaffStatus')
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(StaffStatus))