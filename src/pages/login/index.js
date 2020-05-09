import React, { useEffect } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './style.less';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';


function Login(props) {

    let FormData;

    // props.form
    const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = props.form;
    // dispatch to props
    const { postLoginDispatch } = props;
    // state to props
    const { loginStatus } = props;
    console.log('render loginStatus',loginStatus)

    useEffect(() => {
        if (loginStatus > 1) {
            alert('账号密码错误！')
        }else if(loginStatus === 0){
            props.history.replace('/')
        }
    }, [loginStatus])

    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                // Account = getFieldValue('username').replace(/\s*/g, "");
                // Password = getFieldValue('password').replace(/\s*/g, "");
                const {account, password} = values;
                FormData = {
                    account:account.replace(/\s*/g, ""),
                    password:password.replace(/\s*/g, "")
                }
                postLoginDispatch(FormData)
            }
        });
    };

    return (
        <div className='loginWrapper'>
            <div className='loginHeader'>
                <h1>家政后台管理系统</h1>
            </div>
            <div className='loginContent'>
                <div className='title'>LOGIN</div>
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('account', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Account"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
    loginStatus: state.getIn(['userList','userItem', 'loginStatus']),
})

const mapDispatchToProps = (dispatch) => {
    return {
        postLoginDispatch(FormData) {
            dispatch(actionCreators.postLoginRequest(FormData));
        }
    }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedNormalLoginForm))