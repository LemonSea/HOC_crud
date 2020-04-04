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
class company extends PureComponent {

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
        title: '公司名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '公司负责人',
        dataIndex: 'Officer[nickname]',
        key: 'Officer[nickname]',
      },
      {
        title: '公司地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '员工数量',
        dataIndex: 'staffCount',
        key: 'staffCount',
      },
      {
        title: '公司状态',
        // dataIndex: 'status',
        // key: 'status',
        render: (item) => {
          let text
          const { status, _id } = item;
          if(status === 0) {
            text = '待审核'
          } else if(status === 1) {
            text = '审核通过'
          } else {
            text = '审核不通过'
          }
          return (
            <span>
              <span>
                当前状态：{text}
              </span>
            </span>
          )
        }
      },
      // {
      //   title: '创建时间',
      //   dataIndex: 'createTime',
      //   key: 'createTime',
      //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      // },
    ];
  }

  /**
   * 审核不通过
   */
  changeStatus = (_id, status, pageNum) => {
    const text = status === 1 ? '通过' : '不通过'
    Modal.confirm({
      title: `确定${text}该公司审核吗?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        const result = await reqChangeStatus(_id, status)
        // console.log('result', result)
        if (result.status === 0) {
          message.success('审核完成!');
          this.props.getList(pageNum)
        } else {
          message.warn('审核失败!');
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
            type='primary'
            disabled={!item._id}
            // onClick={() => this.setState({ showStatus: 1 })}
            onClick={() => this.changeStatus(item._id, 1, this.props.pageNum)}
          >
            审核通过
        </Button>
        </span>
        <span>
          <Button
            icon="edit"
            style={{marginLeft: 20}}
            type='danger'
            // onClick={() => { this.setState({ showStatus: 2 }) }}
            onClick={() => this.changeStatus(item._id, 2, this.props.pageNum)}
            disabled={!item._id}
          >审核不通过</Button>
        </span>
        {/* <span>
          <Button
            disabled={!item._id}
            style={{ marginLeft: 30 }}
            type={item.status === 0 ? 'primary' : 'danger'}
            onClick={() => this.changeStatus(item._id, item.status === 0 ? 1 : 0, this.props.pageNum)}
          >
            {item.status === 0 ? '启用该账号' : '冻结该账号'}</Button>
        </span> */}
      </div>
    )

    // 右侧
    const extra = (
      // <Button
      //   type='primary'
      //   disabled={!item._id}
      //   onClick={() => { this.delete(item._id, pageNum) }}
      // >
      //   删除
      // </Button>
      <div>
      <Button
      type='default'
      disabled={!item._id}
      // onClick={() => { this.delete(item._id, pageNum) }}
      onClick={() => this.props.history.push('/company/officerDetail', { item: item.Officer })}
    >
      查看公司负责人详情
    </Button>

      <Button
      style={{marginLeft:20}}
      type='primary'
      disabled={!item._id}
      // onClick={() => { this.delete(item._id, pageNum) }}
      onClick={() => this.props.history.push('/company/CompanyDetail', { item: item })}
    >
      查看公司详情
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(company))