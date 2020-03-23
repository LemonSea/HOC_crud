import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Icon
} from 'antd';

function AddForm(props) {

  let FormData;

  // props.form
  const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = props.form;
  // dispatch to props
  const { } = props;
  // state to props
  const { } = props;
  // const creatorJS = creator ? creator.toJS() : [];

  const { admin } = props;
  console.log(admin)

  return (
    <Form>
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


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const WrappedNormalAddForm = Form.create()(AddForm);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedNormalAddForm))