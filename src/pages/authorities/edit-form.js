import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Icon,
  Select
} from 'antd';


const { Item } = Form;
const { Option } = Select;

class EditForm extends Component {

  componentDidMount() {
    this.props.setForm(this.props.form)
  }

  render() {

    // props.form
    const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = this.props.form;
    // dispatch to props
    const { } = this.props;

    const { item, roles } = this.props;
    console.log('roles', roles)

    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧 label 宽度
      wrapperCol: { span: 18 }  // 右侧包裹的宽度
    }

    return (
      <Form {...formItemLayout}>
        <Item label='账号：' >
          <span>{item.account}</span>
          {/* <Input value={item.account} disabled /> */}
        </Item>
        <Item label='用户姓名' >
          <span>{item.nickname}</span>
          {/* <Input value={item.nickname} disabled /> */}
        </Item>
        <Item label='所属角色' >
          {getFieldDecorator('role', {
            rules: [{ required: true, message: '角色必选！' }],
            initialValue: item.role ? item.role._id : '',
          })(
            <Select>
              {roles.map((item, index) => {
                return (
                  < Option key={item._id} value={item._id}>{item.name}</Option>
                )
              })}
            </Select>)}
        </Item>
      </Form>
    )
  }
}


// const mapStateToProps = (state) => ({
// })

// const mapDispatchToProps = (dispatch) => ({

// })

export default Form.create()(EditForm);
// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedNormalForm))