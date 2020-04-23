import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Icon
} from 'antd';

class AddForm extends Component {

  componentDidMount() {
    this.props.setForm(this.props.form)
  }

  render() {

  // props.form
  const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = this.props.form;
  // dispatch to props
  const { } = this.props;
  // state to props
  const { } = this.props;

  
  const formItemLayout = {
    labelCol: { span: 4 },  // 左侧 label 宽度
    wrapperCol: { span: 18 }  // 右侧包裹的宽度
  }

  return (
    <Form>
      <Form.Item label='角色名称：' {...formItemLayout}>
        {getFieldDecorator('name', {
          initialValue: '',
          rules: [{ required: true, message: '角色名称必须输入!'}]
        })(
          <Input placeholder="输入角色名称" />
        )}
      </Form.Item>
      {/* <Form.Item label='角色备注：' {...formItemLayout}>
        {getFieldDecorator('description', {
          initialValue: '',
          // rules: [{ required: true, message: '角色名称必须输入!'}]
        })(
          <Input placeholder="输入角色备注" />,
        )}
      </Form.Item> */}
    </Form>
  )
}
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const WrappedNormalForm = Form.create()(AddForm);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedNormalForm))