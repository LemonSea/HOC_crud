import React, { useEffect } from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';
import './style.less';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

function Login(props) {

    let Account, Password;

    // props.form
    const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = props.form;
    // dispatch to props
    const { postLoginDispatch } = props;
    // state to props
    const { loginStatus } = props;
    console.log(props.form)


    useEffect(() => {
        if (loginStatus === false) {
            console.log(loginStatus)
            alert('账号密码错误！')
            // 将账号和密码置空
            setFieldsValue({'username':'','password':''});
        }
    }, [loginStatus])

    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                Account = getFieldValue('username').replace(/\s*/g, "");
                Password = getFieldValue('password').replace(/\s*/g, "");
                postLoginDispatch(Account, Password)
            }
        });
    };

    return (
        <div className='loginWrapper'>
            <div className='loginHeader'>
                <h1>文章管理系统</h1>
            </div>
            <div className='loginContent'>
                <div className='title'>LOGIN</div>
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
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
    loginStatus: state.getIn(['login', 'loginStatus']),
})

const mapDispatchToProps = (dispatch) => {
    return {
        postLoginDispatch(Account, Password) {
            dispatch(actionCreators.postLoginRequest(Account, Password));
        }
    }
}


const WrappedNormalLoginForm = Form.create()(Login);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedNormalLoginForm))