import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';

import { Card, Table, Button, Icon, Modal } from 'antd';
import LinkButton from '../../../components/link-button';

import AddForm from './add-form';
import EditForm from './edit-form';

/*
  职员类型管理
*/
class StaffStatus extends Component {

  // table 标题
  initColumns = () => {
    this.columns = [
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
        render: (item) => (  // 返回需要线上的界面标签
          <span>
            <LinkButton onClick={() => {
              this.props.showEdit(item)
            }
            }>修改分类</LinkButton>
            <LinkButton onClick={() => {
              this.props.deleteById(item)
              this.props.getStaffStatusList();
            }
            }>删除分类</LinkButton>
          </span>
        ),
      }
    ];
  }

  componentWillMount() {
    // list 标题
    this.initColumns()
  }

  componentDidMount() {
    this.props.getStaffStatusList()
  }

  render() {
    // dispatch to props
    const { getStaffStatusList } = this.props;
    // dispathc to props by Modal
    const { showAdd, handleCancel, showEdit, addStaffStatus, editStaffStatus, deleteById } = this.props;

    // state to props
    const { staffStatusList, loading, showStatus, creator, currentObj } = this.props;
    const staffStatusListJS = staffStatusList ? staffStatusList.toJS() : [];
    const creatorJS = creator ? creator.toJS() : {};
    // const currentObjJS = currentObj ? currentObj.toJS() : {};
    // console.log(currentObj)

    // list 内容
    const dataSource = staffStatusListJS;

    // card 的左侧标题
    const title = '员工类型';
    // card 的右侧
    const extra = (
      <Button type='primary' onClick={() => {
        showAdd()
      }} >
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
          columns={this.columns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />;

        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={() => {
            addStaffStatus(creatorJS, this.form);
            getStaffStatusList();
          }}
          onCancel={() => { handleCancel(this.form) }}
        >
          <AddForm
            setForm={(form) => { this.form = form }}
          />
        </Modal>

        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={() => {
            editStaffStatus(currentObj._id, creatorJS, this.form);
            getStaffStatusList();
          }}
          onCancel={() => { handleCancel(this.form) }}
        >
          <EditForm
            item={currentObj}
            setForm={(form) => { this.form = form }}
          />
        </Modal>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
  // staff status's list
  staffStatusList: state.getIn(['staffStatusList', 'staffStatusList', 'staffStatusList']),
  // list loading ...
  loading: state.getIn(['staffStatusList', 'staffStatusList', 'loading']),
  // modal show status
  showStatus: state.getIn(['staffStatusList', 'showStatus']),
  // current admin
  creator: state.getIn(['userList', 'userItem', 'user']),
  // current admin
  currentObj: state.getIn(['staffStatusList', 'currentObj']),
})

const mapDispatchToProps = (dispatch) => ({
  getStaffStatusList() {
    dispatch(actionCreators.getStaffStatusList());
  },

  handleCancel(form) {
    dispatch(actionCreators.handleCancel());
    form.resetFields();
  },
  showAdd() {
    dispatch(actionCreators.showAdd());
  },
  showEdit(item) {
    dispatch(actionCreators.showEdit());
    dispatch(actionCreators.saveCurrentObj(item));
  },

  addStaffStatus(creator, form) {
    const formDate = {
      name: form.getFieldValue('name'),
      describe: form.getFieldValue('describe'),
      creator: creator._id
    }
    dispatch(actionCreators.addStaffStatus(formDate));
    form.resetFields();
    dispatch(actionCreators.handleCancel());
  },
  editStaffStatus(_id, creator, form) {
    const formDate = {
      name: form.getFieldValue('name'),
      describe: form.getFieldValue('describe'),
      creator: creator._id
    }
    dispatch(actionCreators.editStaffStatus(_id, formDate));
    form.resetFields();
    dispatch(actionCreators.handleCancel());
  },
  deleteById(item){
    console.log(item._id)
    dispatch(actionCreators.deleteById(item._id));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(StaffStatus))