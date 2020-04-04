import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { reqChangeStatus, reqDelete } from './api';
import moment from 'moment';

import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  Modal,
  message
} from 'antd';
import LinkButton from '../../components/link-button/index';
import { PAGE_SIZE } from '../../utils/constant';

// import AuthForm from './auth-form';
// import EditForm from './edit-form';

import { actionCreators as roleActionCreators } from '../role/store';

const Option = Select.Option;

// Product 的默认子路由组件
class OfficerHome extends PureComponent {

  constructor(props) {
    super(props)
    this.auth = React.createRef()

    this.state = {
      item: {},  // 当前选中项
      isShowAdd: false,  // 是否显示添加界面
      isShowAuth: false,  // 是否显示设置权限界面
      showStatus: 0
    }
  }

  // table 标题
  initColumns = () => {
    this.columns = [
      {
        title: '账号',
        dataIndex: 'Officer[account]',
        key: 'Officer[account]',
      },
      {
        title: '名称',
        dataIndex: 'Officer[nickname]',
        key: 'Officer[nickname]',
      },
      {
        title: '性别',
        render: (item) => {
          const { gender } = item.Officer;
          return (
            <span>
              <span >{gender === 0 ? '女' : '男'}</span>
            </span>
          )
        }
      },
      {
        title: '对应公司',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '账号状态',
        render: (item) => {
          const { status, _id } = item.Officer;
          const newStatus = status === 0 ? 1 : 0;
          return (
            <span>
              <span style={{ marginRight: 30, color: status === 0 ? 'red' : 'blue' }}>当前状态：{status === 0 ? '冻结' : '启用'}</span>
              <Button
                style={{ marginRight: -30 }}
                type={status === 0 ? 'primary' : 'danger'}
                onClick={() => this.changeStatus(_id, newStatus, this.props.pageNum)}
              >
                {status === 0 ? '启用该账号' : '冻结该账号'}
              </Button>
            </span>
          )
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];
  }

  /**
   * 修改账号状态（0：冻结，1：启用）
   */
  changeStatus = (_id, status, pageNum) => {
    const text = status === 0 ? '冻结' : '启用'
    Modal.confirm({
      title: `确定${text}该账号吗?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        const result = await reqChangeStatus(_id, status)
        console.log('changeStatus to', status)
        if (result.status === 0) {
          message.success('修改账号状态成功!');
          this.props.getList(pageNum)
        } else {
          message.warn('修改账号状态失败!');
        }
      },
      // onCancel() {
      //   console.log('Cancel');
      // },
    });
  }
  /**
   * 删除账号
   */
  delete = (_id, pageNum) => {
    Modal.confirm({
      title: `确定删除该账号吗?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        // message.success(this.state.item._id)
        const result = await reqDelete(_id)
        console.log('result', result)
        if (result.status === 0) {
          message.success('删除成功!');
          this.props.getList(pageNum)
        } else {
          message.warn('删除失败!');
        }
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
        // console.log(item)
      }
    }
  }

  handleCancel = e => {
    // console.log(e);
    this.setState({
      showStatus: 0
    });
    this.form.resetFields();
  };


  componentWillMount() {
    // list 标题
    this.initColumns()
  }

  componentDidMount() {
    // console.log('staffStatus')
    this.props.getList(1)
    this.props.getRoleList()
  }

  render() {
    // dispatch to props
    const { getList } = this.props;
    // const { getList, changeSearchType, changeSearchName } = this.props;

    // state to props
    const { list, loading, total, roles, pageNum } = this.props;
    const listJS = list ? list.toJS() : [];
    const rolesJS = roles ? roles.toJS() : [];

    const { item, showStatus } = this.state

    const dataSource = listJS;

    // 左侧
    const title = (
      <div>
        <span>
          <Button
            icon="edit"
            type='danger'
            disabled={!item._id}
            onClick={() => { this.delete(item._id, pageNum) }}
          >
            删除用户
        </Button>
        </span>
      </div>
    )

    // 右侧
    const extra = (
      // <Button type='primary' onClick= {()=> {console.log("delete")}}>
      <div>
        <Button
          type='default'
          disabled={!item._id}
          // onClick={() => { this.delete(item._id, pageNum) }}
          onClick={() => this.props.history.push('/company/CompanyDetail', { item: item })}
        >
          查看公司详情
        </Button>

        <Button
          style={{ marginLeft: 20 }}
          type='primary'
          disabled={!item._id}
          // onClick={() => { this.delete(item._id, pageNum) }}
          onClick={() => this.props.history.push('/company/officerDetail', { item: item.Officer })}
        >
          查看公司负责人详情
              </Button>
      </div>
    )

    return (
      <Card title={title} extra={extra}>
        {/* <Card title={title}> */}
        <Table
          bordered={true}
          rowKey='_id'
          loading={loading}
          dataSource={dataSource}
          columns={this.columns}
          pagination={{
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: (pageNum) => { getList(pageNum) }
          }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [item._id],
            onSelect: (item) => {
              this.setState({
                item
              })
            }
          }}
          onRow={this.onRow}
        ></Table>

        {/* <Modal
          title="查看权限"
          visible={showStatus === 2}
          onOk={() => {
            this.setState({ showStatus: 0 })
            // this.updateRole(creatorJS, this.form);
            // getList()
          }}
          onCancel={() => {
            this.setState({ showStatus: 0 })
            // this.form.resetFields();
          }}
        >
          <AuthForm
            item={item.role}
            list={this.props.menuList}
            // ref={this.auth}
          // setForm={(form) => { this.form = form }}
          />
        </Modal> */}

        {/* <Modal
          title="管理角色"
          visible={showStatus === 1}
          onOk={() => {
            this.changeRole(this.props.pageNum)
          }}
          onCancel={this.handleCancel}
        >
          <EditForm
            item={item}
            roles={rolesJS}
            setForm={(form) => { this.form = form }}
          />
        </Modal> */}

      </Card>
    )
  }
}


const mapStateToProps = (state) => ({
  list: state.getIn(['officerReducer', 'list']),
  loading: state.getIn(['officerReducer', 'loading']),
  total: state.getIn(['officerReducer', 'total']),
  pageNum: state.getIn(['officerReducer', 'pageNum']),
  roles: state.getIn(['roleReducer', 'list']),
  menuList: state.getIn(['menuList', 'menuList', 'menuList']),
})

const mapDispatchToProps = (dispatch) => ({
  getList(pageNum, searchType, searchName) {
    console.log('getList officer')
    console.log('getList pageNum', pageNum)
    dispatch(actionCreators.reqList(pageNum, PAGE_SIZE));
    // if (searchName) {
    //   dispatch(actionCreators.searchList(pageNum, PAGE_SIZE, searchType, searchName));
    // }
    // else {
    //   dispatch(actionCreators.reqList(pageNum, PAGE_SIZE));
    // }
  },
  getRoleList() {
    console.log('getRoleList')
    dispatch(roleActionCreators.getList());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(OfficerHome))