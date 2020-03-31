import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { reqChangeStatus } from './api';
import moment from 'moment';

import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message
} from 'antd';
import LinkButton from '../../components/link-button/index';
import { PAGE_SIZE } from '../../utils/constant';

const Option = Select.Option;

// Product 的默认子路由组件
class Authorities extends Component {

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
        title: '用户名称',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '所属角色',
        dataIndex: 'role[name]',
        key: 'role[name]',
      },
      {
        title: '账号状态',
        render: (item) => {
          const {status, _id } = item;
          const newStatus = status === 0 ? 1 : 0;
          // console.log(item)
          return (
            <span>
              <span style={{marginRight: 30, color: status === 0 ? 'red' : 'blue'}}>当前状态：{status === 0 ? '冻结' : '启用'}</span>
              <Button
                style={{marginRight: -30}}
                type={status === 0 ? 'primary' : 'danger'}
                onClick={() => this.changeStatus(_id, newStatus, this.props.pageNum)}
              >{status === 0 ? '启用该账号' : '冻结该账号'}</Button>
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
      // {
      //   title: '操作',
      //   width: 300,
      //   render: (item) => (  // 返回需要线上的界面标签
      //     <span>
      //       <LinkButton onClick={() => {
      //         this.props.showEdit(item)
      //       }
      //       }>修改分类</LinkButton>
      //       <LinkButton onClick={() => {
      //         this.props.deleteById(item)
      //         this.props.getStaffStatusList();
      //       }
      //       }>删除分类</LinkButton>
      //     </span>
      //   ),
      // }
    ];
  }

  // 修改账号状态（0：冻结，1：启用）
  changeStatus = async (_id, status, pageNum) => {
    // console.log('changeStatus',_id, status, pageNum )
    const result = await reqChangeStatus(_id, status)
    console.log('result', result)
    if (result.status === 0) {
      message.success('修改账号状态成功!');
      // this.setState({ isShowAuth: false });
      this.props.getList()
    } else {
      message.warn('修改账号状态失败!');
    }
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

  componentWillMount() {
    // list 标题
    this.initColumns()
  }

  componentDidMount() {
    // console.log('staffStatus')
    this.props.getList(1)
  }

  render() {
    // dispatch to props
    const { getList } = this.props;
    // const { getList, changeSearchType, changeSearchName } = this.props;

    // state to props
    const { list, loading, total } = this.props;
    const listJS = list ? list.toJS() : [];

    const { item, isShowAdd, isShowAuth } = this.state

    const dataSource = listJS;

    // 左侧
    const title = (
      <span>
        <Button 
          icon="edit" 
          disabled={!item._id}
        >
          角色管理
        </Button>
      </span>
    )

    // // 右侧
    // const extra = (
    //   <Button type='primary' onClick={() => this.props.history.push('/staff/staff/addUpdate')}>
    //     <Icon type='plus' />
    //     添加
    //   </Button>
    // )

    return (
      // <Card title={title} extra={extra}>
      <Card title={title}>
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
          rowSelection={{ type: 'radio', selectedRowKeys: [item._id] }}
          onRow={this.onRow}
        ></Table>
      </Card>
    )
  }
}


const mapStateToProps = (state) => ({
  list: state.getIn(['authoritiesReducer', 'list']),
  loading: state.getIn(['authoritiesReducer', 'loading']),
  total: state.getIn(['authoritiesReducer', 'total']),
  pageNum: state.getIn(['authoritiesReducer', 'pageNum']),
})

const mapDispatchToProps = (dispatch) => ({
  getList(pageNum, searchType, searchName) {
    dispatch(actionCreators.reqList(pageNum, PAGE_SIZE));
    // if (searchName) {
    //   dispatch(actionCreators.searchList(pageNum, PAGE_SIZE, searchType, searchName));
    // }
    // else {
    //   dispatch(actionCreators.reqList(pageNum, PAGE_SIZE));
    // }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Authorities))