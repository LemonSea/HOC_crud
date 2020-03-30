import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Card,
  Form,
  Input,
  Cascader,
  Upload,
  Button,
  Select,
  Icon,
  Radio,
  DatePicker,
  Rate
} from 'antd';
import LinkButton from '../../components/link-button/index';
import PicturesWall from './pictures-wall';

import { actionCreators } from './store';

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;
const desc = ['1分', '2分', '3分', '4分', '5分'];
// Staff 的添加和更新子路由
class StaffAddUpdate extends Component {

  constructor(props) {
    super(props);
    this.pw = React.createRef();
  }

  state = {
    radioValue: 1,
    star: 0,
    selectOption: '',
    inductionTime: ''
  };

  // 评分
  handleRateChange = value => {
    // console.log(`Rate ${value}`);
    this.setState({ star: value });
  };

  // 单选框
  onRadioChange = e => {
    // console.log('radio checked', e.target.value);
    this.setState({
      radioValue: e.target.value,
    });
  };

  // 下拉框
  handleSelectChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({ selectOption: value });
  }
  // time
  onDatePickerChange = (date, dateString) => {
    console.log(date, dateString);
    this.setState({ inductionTime: dateString });
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
        const imgs = this.pw.current.getImgs()
        let formData = {
          name: value.name,
          // staffStatus: this.state.selectOption,
          staffStatus: value.staffStatus,
          company: '5e8157afe156e748b48370a5', //*
          costHour: value.costHour,
          status: this.props.location.state ? this.props.location.state.item.status : 0,
          workNumber: value.workNumber,
          IDCard: value.IDCard,
          imgs,
          gender: value.gender,
          // gender: this.state.radioValue,
          age: value.age,
          // inductionTime: this.state.inductionTime,
          inductionTime: value.inductionTime,
          address: value.address,
          star: this.state.star,
          introduction: value.introduction,
        }
        console.log('formData', formData)
        if (this.props.location.state) {
          console.log('update')
          const _id = this.props.location.state.item._id;
          this.props.editStaff(_id, formData)
          this.props.history.push('/staff/staff')
        } else {
          console.log('add')
          this.props.addStaff(formData)
          this.props.history.push('/staff/staff')
        } 
      }
    })
  }

  componentDidMount() {
    // 获取员工类型
    this.props.getStaffType()
  }

  componentWillMount() {
    const item = this.props.location.state
    this.isUpdate = !!item
    this.item = item ? item.item : { staffStatus: { _id:'请输入员工类型！' } }
    
    // console.log('item', item)


    this.setState({ radioValue: this.item.gender });
    this.setState({ star: this.item.star });
    // this.setState({ selectOption: this.item.star });
    // this.setState({ inductionTime: this.item.star });
  }

  render() {

    const { staffType } = this.props;
    const staffTypeJS = staffType ? staffType.toJS() : [];
    // console.log('staffTypeJS', staffTypeJS)

    const formItemLayout = {
      labelCol: { span: 2 },  // 左侧 label 宽度
      wrapperCol: { span: 8 }  // 右侧包裹的宽度
    }

    const { star } = this.state;

    const { isUpdate, item } = this
    console.log('item', item)
    // console.log('staffStatus', item.staffStatus._id)

    // 左侧
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{ fontSize: 20 }} onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>{isUpdate ? '修改员工信息' : '添加员工'}</span>
      </span>
    )

    // props.form
    const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = this.props.form;

    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label='员工名称:'>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [{ required: true, message: '必须输入员工名称!' }],
            })(<Input placeholder='员工名称' />)}
          </Item>
          {/* select */}
          <Item label='员工类型'>
            {getFieldDecorator('staffStatus', {
              initialValue: item.staffStatus._id,
              // initialValue: item ? item.staffStatus._id : "请输入员工类型",
              rules: [{ required: true, message: '必须输入员工类型!' }],
            })(
              <Select style={{ width: 410 }} onChange={this.handleSelectChange}>
                {staffTypeJS.map((item, index) => {
                  return (
                    < Option key={item._id} value={item._id}>{item.name}</Option>
                  )
                })}
              </Select>)}
          </Item>
          <Item label='费用:'>
            {getFieldDecorator('costHour', {
              initialValue: item.costHour,
              rules: [
                { required: true, message: '必须输入单位费用!' },
                { validator: this.validatePrice }
              ],
            })(<Input type='number' placeholder='费用' addonAfter='元 / 小时' />)}
          </Item>
          <Item label='工号:'>
            {getFieldDecorator('workNumber', {
              initialValue: item.workNumber,
            })(<Input placeholder='工号' />)}
          </Item>
          <Item label='身份证号码:'>
            {getFieldDecorator('IDCard', {
              initialValue: item.IDCard,
            })(<Input placeholder='身份证号码' />)}
          </Item>
          {/* PicturesWall */}
          <Item label='员工照片'>
            <PicturesWall ref={this.pw} imgs={item.imgs}></PicturesWall>
          </Item>
          {/* Radio */}
          <Item label='性别:'>
          {getFieldDecorator('gender', {
              initialValue: item ? item.gender : this.state.radioValue,
              // rules: [{ required: true, message: '必须输入员工类型!' }],
            })(
            <Radio.Group onChange={this.onRadioChange}>
              <Radio value={0}>女</Radio>
              <Radio value={1}>男</Radio>
            </Radio.Group>)}
          </Item>
          <Item label='年龄:'>
            {getFieldDecorator('age', {
              initialValue: item.age,
            })(<Input placeholder='年龄' />)}
          </Item>
          {/* DatePicker */}
          <Item label='入职时间:'>
            {/* {console.log('item.inductionTime', item)} */}
            {getFieldDecorator('inductionTime', {
              initialValue: item ? moment(item.inductionTime) : null,
              rules: [{ required: true, message: '必须输入入职时间!' }],
            })(
              <DatePicker
                // defaultValue={item ? moment(item.inductionTime) : null}
                onChange={this.onDatePickerChange}
                placeholder="入职时间"
                style={{ width: 410 }}
              />)}
          </Item>
          <Item label='家庭地址:'>
            {getFieldDecorator('address', {
              initialValue: item.address,
            })(<TextArea placeholder='家庭地址' autosize={{ minRows: 2, maxRows: 6 }} />)}
          </Item>
          {/* Rate */}
          <Item label='星级:'>            
          {getFieldDecorator('star', {
              initialValue: star,
              // rules: [{ required: true, message: '必须输入星级!' }],
            })(
            <span>
              <Rate tooltips={desc} onChange={this.handleRateChange} value={star} />
              {star ? <span className="ant-rate-text">{desc[star - 1]}</span> : ''}
            </span>)}
          </Item>
          <Item label='员工简介'>
            {getFieldDecorator('introduction', {
              initialValue: item.introduction,
            })(<TextArea placeholder='员工简介' autosize={{ minRows: 2, maxRows: 6 }} />)}
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
  addStaff(data) {
    dispatch(actionCreators.addStaff(data));
  },
  editStaff(_id, data) {
    dispatch(actionCreators.editStaff(_id, data));
  },
})

const StaffAddUpdateForm = Form.create()(StaffAddUpdate);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(StaffAddUpdateForm))