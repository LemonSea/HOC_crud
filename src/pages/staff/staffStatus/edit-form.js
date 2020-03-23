import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Icon
} from 'antd';

function EditForm(props) {

  let formData;

  // props.form
  const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = props.form;
  // dispatch to props
  const { } = props;
  // state to props
  const { } = props;

  // admin / item
  const { item, admin, setForm, setFormData } = props;
  // console.log(item)
  // console.log(admin)

  useEffect(() => {
    setForm(props.form);
    return () => {
      formData = {
        name: getFieldValue('name'),
        describe: getFieldValue('describe')
      }
      setFormData(formData)
    }
  }, [])

  return (
    <Form >
      <Form.Item>
        {getFieldDecorator('name', {
          initialValue: item.name
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


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const WrappedNormalAddForm = Form.create()(EditForm);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedNormalAddForm))