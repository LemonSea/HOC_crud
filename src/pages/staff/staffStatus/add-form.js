import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input
} from 'antd';

function AddForm(props) {

  let FormData;

  // props.form
  const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = props.form;
  // dispatch to props
  const { } = props;
  // state to props
  const { } = props;

  return (
    <Form>
      <Form.Item>
        <Input placeholder="Basic usage" />
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