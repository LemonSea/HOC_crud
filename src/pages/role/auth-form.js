import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { actionCreators } from './store';
import {
  Form,
  Input,
  Icon,
  Tree
} from 'antd';

const { TreeNode } = Tree;
const { Item } = Form;

export default class AuthForm extends Component {

  constructor(props) {
    super(props);
    const { menu } = this.props.item
    this.state = {
      checkedKeys: menu,
    }
  }

  // 为父组件获取最新的 menu
  getMenus = () => this.state.checkedKeys;

  getTreeNodes = (menuList) => {
    // console.log(menuList)
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key} >
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )

      return pre;
    }, [])
  }

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys)
    this.setState({checkedKeys})
  }

  componentWillMount() {
    this.treeNodes = this.getTreeNodes(this.props.list.toJS())
  }

  componentWillReceiveProps(nextProps) {
    const menu = nextProps.item.menu
    this.setState({
      checkedKeys: menu,
    })
  }

  render() {
    // dispatch to props
    // const { getMenuList } = this.props;
    // state to props
    const { list } = this.props;
    const menuList = list ? list.toJS() : [];
    // console.log(menuList)

    const { item } = this.props;
    const { checkedKeys } = this.state;


    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧 label 宽度
      wrapperCol: { span: 18 }  // 右侧包裹的宽度
    }

    return (
      <div>
        <Item label='角色名称：' {...formItemLayout}>
          <Input value={item.name} disabled />,
        </Item>
        <Item>
          <Tree
            checkedKeys={checkedKeys}
            checkable
            defaultExpandAll={true}
            onCheck={this.onCheck}
          >
            <TreeNode title="平台权限" key="all">
              {this.treeNodes}
            </TreeNode>
          </Tree>
        </Item>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   list: state.getIn(['menuList', 'menuList', 'menuList']),
// })

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // getMenuList() {
//     //   dispatch(actionCreators.getMenuList());
//     // }
//   }
// }

// 高阶函数 withRouter，包装非路由组件，新组件
// const LeftNav =withRouter(LeftNav);
// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AuthForm))
// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedNormalForm))