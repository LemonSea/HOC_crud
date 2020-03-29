import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Form,
  Input,
  Cascader,
  Upload,
  Button,
  Select,
  Icon
} from 'antd';
import LinkButton from '../../components/link-button/index';

import { actionCreators } from './store';

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

// Staff 的添加和更新子路由
class StaffAddUpdate extends Component {

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  /**
   * 验证价格的函数
   */
  validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback()
    } else {
      callback('价格必须大于0')
    }
  }

  /**
   * 提交
   */
  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (!error) {
        alert('submit')
      }
    })
  }

  componentDidMount() {
    console.log('getStaffType')
    this.props.getStaffType()
  }

  render() {

    const { staffType } = this.props;
    const staffTypeJS = staffType ? staffType.toJS() : [];
    console.log('staffTypeJS', staffTypeJS)

    const formItemLayout = {
      labelCol: { span: 2 },  // 左侧 label 宽度
      wrapperCol: { span: 8 }  // 右侧包裹的宽度
    }

    // 左侧
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{ fontSize: 20 }} />
        </LinkButton>
        <span>添加员工</span>
      </span>
    )

    // props.form
    const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = this.props.form;

    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label='员工名称:'>
            {getFieldDecorator('name', {
              initialValue: '',
              rules: [{ required: true, message: '必须输入员工名称!' }],
            })(<Input placeholder='员工名称' />)}
          </Item>
          <Item label='员工类型'>
            <Select defaultValue="选择员工类型" style={{ width: 410 }}  onChange={this.handleChange}>
              {staffTypeJS.map((item, index) => {
                return (
                  < Option key={item.name} value={item.name}>{item.name}</Option>
                )
              })}
            </Select>
          </Item>
          <Item label='费用:'>
            {getFieldDecorator('costHour', {
              initialValue: '',
              rules: [
                { required: true, message: '必须输入单位费用!' },
                { validator: this.validatePrice }
              ],
            })(<Input type='number' placeholder='费用' addonAfter='元 / 小时' />)}
          </Item>
          <Item label='工号:'>
            {getFieldDecorator('workNumber', {
              initialValue: '',
            })(<Input placeholder='工号' />)}
          </Item>
          <Item label='身份证号码:'>
            {getFieldDecorator('IDCard', {
              initialValue: '',
            })(<Input placeholder='身份证号码' />)}
          </Item>
          <Item label='员工照片'>
            <div>员工照片</div>
          </Item>
          <Item label='性别:'>
            {getFieldDecorator('gender', {
              initialValue: '',
            })(<Input placeholder='性别' />)}
          </Item>
          <Item label='年龄:'>
            {getFieldDecorator('age', {
              initialValue: '',
            })(<Input placeholder='年龄' />)}
          </Item>
          <Item label='入职时间:'>
            {getFieldDecorator('inductionTime', {
              initialValue: '',
            })(<Input placeholder='入职时间' />)}
          </Item>
          <Item label='家庭地址:'>
            {getFieldDecorator('address', {
              initialValue: '',
            })(<TextArea placeholder='家庭地址' autosize={{ minRows: 2, maxRows: 6 }} />)}
          </Item>
          <Item label='星级:'>
            {getFieldDecorator('star', {
              initialValue: '',
            })(<Input placeholder='星级' />)}
          </Item>
          <Item label='员工简介'>
            <div>员工简介</div>
          </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>提交</Button>
          </Item>
        </Form>
      </Card >
    )
  }
}

const mapStateToProps = (state) => ({
  staffType: state.getIn(['staffReducer', 'staffType']),
})

const mapDispatchToProps = (dispatch) => ({
  getStaffType() {
    dispatch(actionCreators.getStaffType());
  },
})

const StaffAddUpdateForm = Form.create()(StaffAddUpdate);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(StaffAddUpdateForm))