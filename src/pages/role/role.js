import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { reqAddRole, reqUpdateRole, reqDeleteRole } from './api';
import AddForm from './add-form';
import AuthForm from './auth-form';
import moment from 'moment';

import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Modal,
  Table,
  message
} from 'antd';
import LinkButton from '../../components/link-button/index';
import { PAGE_SIZE } from '../../utils/constant';

const Option = Select.Option;

// Product 的默认子路由组件
class Role extends Component {

  constructor(props) {
    super(props)
    this.auth = React.createRef()

    this.state = {
      item: {},  // 当前选中项
      isShowAdd: false,  // 是否显示添加界面
      isShowAuth: false,  // 是否显示设置权限界面
    }
  }

  // table 标题
  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '角色管理员',
        dataIndex: 'creator[nickname]',
        key: 'creator[nickname]',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        width: 300,
        render: (item) => (  // 返回需要线上的界面标签
          <span>
            <Button type='danger' onClick={() => {this.delete(this.deleteRole)}}
            >删除角色</Button>
          </span>
        ),
      }
    ];
  }

  delete = (deleteRole) => {
    Modal.confirm({
      title: '确定删除该角色吗?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteRole();
      },
      // onCancel() {
      //   console.log('Cancel');
      // },
    });
  }

  // 全行选中
  onRow = (item) => {
    return {
      onClick: event => {  // 点击行
        this.setState({
          item
        })
      }
    }
  }

  /**
   * 添加角色
   */
  addRole = (creator) => {
    this.form.validateFields(async (err, value) => {
      if (!err) {
        const formDate = {
          name: value.name,
          describe: value.describe,
          creator: creator._id
        }
        const result = await reqAddRole(formDate)
        if (result.status === 0) {
          message.success('添加角色成功!');
          this.setState({ isShowAdd: false });
          this.form.resetFields();
          this.props.getList()
        } else {
          message.warn('添加角色失败!');
        }
      }
    })
    // console.log('addRole', this.form)
  };

 /**
   * 更新角色权限
   */
  updateRole = async () => {
    const item = this.state.item;
    const menu = this.auth.current.getMenus()
    item.menu = menu;
    console.log(item.menu)
    const result = await reqUpdateRole(item._id, item.menu)
    if (result.status === 0) {
      message.success('修改角色权限成功!');
      this.setState({ isShowAuth: false });
      this.props.getList()
    } else {
      message.warn('修改角色权限失败!');
    }
  };

     /**
   * 删除角色
   */
  deleteRole = async () => {
    const item = this.state.item;
    const result = await reqDeleteRole(item._id)
    if (result.status === 0) {
      message.success('删除角色成功!');
      this.props.getList()
    } else {
      message.warn('删除角色失败!');
    }
  };

  componentWillMount() {
    // list 标题
    this.initColumns()
  }
  componentDidMount() {
    this.props.getList()
  }

  render() {
    // dispatch to props
    // const { addRole, getList } = this.props;

    // state to props
    const { list, creator } = this.props;
    const listJS = list ? list.toJS() : [];
    const creatorJS = creator ? creator.toJS() : {};

    const { item, isShowAdd, isShowAuth } = this.state

    // 左侧
    const title = (
      <span>
        <Button type='primary'
          onClick={() => { this.setState({ isShowAdd: true }) }}
        >创建角色</Button>&nbsp;&nbsp;
        <Button
          type='primary'
          onClick={() => { this.setState({ isShowAuth: true }) }}
          disabled={!item._id}
        >创设置角色权限</Button>
      </span>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={listJS}
          columns={this.columns}
          pagination={{
            defaultPageSize: PAGE_SIZE,
          }}
          rowSelection={{ type: 'radio', selectedRowKeys: [item._id] }}
          onRow={this.onRow}
        />

        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={() => {
            this.addRole(creatorJS, this.form);
            // getList()
          }}
          onCancel={() => {
            this.setState({ isShowAdd: false })
            this.form.resetFields();
          }}
        >
          <AddForm
            setForm={(form) => { this.form = form }}
          />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={() => {
            this.updateRole(creatorJS, this.form);
            // getList()
          }}
          onCancel={() => {
            this.setState({ isShowAuth: false })
            // this.form.resetFields();
          }}
        >
          <AuthForm
            item={item}
            list={this.props.menuList}
            ref={this.auth}
          // setForm={(form) => { this.form = form }}
          />
        </Modal>
      </Card>
    )
  }
}


const mapStateToProps = (state) => ({
  //list
  list: state.getIn(['roleReducer', 'list']),
  creator: state.getIn(['userList', 'userItem', 'user']),
  menuList: state.getIn(['menuList', 'menuList', 'menuList']),
})

const mapDispatchToProps = (dispatch) => ({
  getList() {
    dispatch(actionCreators.getList());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Role))