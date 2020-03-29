import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';

import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table
} from 'antd';
import LinkButton from '../../components/link-button/index';
import { PAGE_SIZE } from '../../utils/constant';

const Option = Select.Option;

// Product 的默认子路由组件
class StaffHome extends Component {

  // table 标题
  initColumns = () => {
    this.columns = [
      {
        title: '员工名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '员工类型',
        dataIndex: 'staffStatus',
        key: 'staffStatus',
      },
      {
        title: '所属公司',
        dataIndex: 'company',
        key: 'company',
      },
      {
        title: '价格/小时',
        dataIndex: 'costHour',
        key: 'costHour',
      },
      {
        title: '星级',
        dataIndex: 'star',
        key: 'star',
      },
      {
        title: '订单总数',
        dataIndex: 'orderCount',
        key: 'orderCount',
      },
      {
        title: '好评订单数',
        dataIndex: 'highPraiseOrder',
        key: 'highPraiseOrder',
      },
      {
        title: '差评订单数',
        dataIndex: 'badReviewOrder',
        key: 'badReviewOrder',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          return(
            <span>
              <Button type='primary'>空闲</Button>
              <Button type='danger'>忙碌</Button>
              &emsp;空闲
            </span>
          )
        }
      },
      {
        title: '操作',
        width: 100,
        render: (item) => (  // 返回需要线上的界面标签
          <span>
            <LinkButton onClick={() => {
              // this.props.showEdit(item)
            }
            }>详情</LinkButton>
            <LinkButton onClick={() => {
              // this.props.showEdit(item)
            }
            }>修改</LinkButton>
            <LinkButton onClick={() => {
              // this.props.deleteById(item)
              // this.props.getStaffStatusList();
            }
            }>删除</LinkButton>
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
    this.props.getList(1)
  }

  render() {
    // dispatch to props
    const { getList, searchList,  changeSearchType, changeSearchName } = this.props;
    
    // state to props
    const { list, loading, total, searchType, searchName } = this.props;
    const listJS = list ? list.toJS() : [];

    // list 内容
    const dataSource = listJS;

    const title = (
      <span>
        <Select 
          value={searchType} 
          style={{ width: 150 }} 
          onChange={(value) => { changeSearchType(value)} }
        >
          <Option value='name'>按名称搜索</Option>
          <Option value='company'>按公司搜索</Option>
        </Select>
        <Input 
          placeholder='关键字' 
          style={{ width: 150, margin: '0 15px' }}
          value={searchName}
          onChange={(event) => { changeSearchName(event.target.value)}}
          />
        <Button 
          type='primary'
          onClick={()=>{getList(1, searchType, searchName)}}
        >搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary'>
        <Icon type='plus' />
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
          pagination={{ 
            total, 
            defaultPageSize: PAGE_SIZE, 
            showQuickJumper: true,
            onChange: (pageNum)=> { getList(pageNum, searchType, searchName) }
          }}
        ></Table>
      </Card>
    )
  }
}


const mapStateToProps = (state) => ({
  // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
  // staff status's list
  list: state.getIn(['staffReducer', 'list']),
  // list loading ...
  loading: state.getIn(['staffReducer', 'loading']),
  // page total
  total: state.getIn(['staffReducer', 'total']),
  searchType: state.getIn(['staffReducer', 'searchType']),
  searchName: state.getIn(['staffReducer', 'searchName']),
})

const mapDispatchToProps = (dispatch) => ({
  getList(pageNum, searchType, searchName) {
    if(searchName) {
      dispatch(actionCreators.searchList(pageNum, PAGE_SIZE, searchType, searchName));
    }
    else {
      dispatch(actionCreators.reqList(pageNum, PAGE_SIZE));
    }
  },
  changeSearchType(value) {
    dispatch(actionCreators.changeSearchType(value));
  },
  changeSearchName(value) {
    dispatch(actionCreators.changeSearchName(value));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(StaffHome))