import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Icon
} from 'antd';

class EditForm extends Component {

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

  const { item } = this.props;
  // console.log('item', item)

  return (
    <Form >
      <Form.Item>
        {getFieldDecorator('name', {
          initialValue: item.name,
          rules: [
            { required: true, message: '分类名称必须输入!'}
          ]
        })(
          <Input placeholder="输入员工类别名" />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('describe', {
          initialValue: item.describe
        })(
          <Input placeholder="输入类别描述" />,
        )}
      </Form.Item>
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

const WrappedNormalForm = Form.create()(EditForm);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedNormalForm))