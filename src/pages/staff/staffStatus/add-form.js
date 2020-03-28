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

  return (
    <Form >
      <Form.Item>
        {getFieldDecorator('name', {
          initialValue: ''
        })(
          <Input placeholder="输入员工类别名" />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('describe', {
          initialValue: ''
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

const WrappedNormalForm = Form.create()(AddForm);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedNormalForm))