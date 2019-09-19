import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './style.less';
import { connect } from 'react-redux';

function Login(props) {

    let Account, Password;
    const { getFieldDecorator, validateFields, getFieldValue } = props.form;
    // console.log(props.form)

    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                Account = getFieldValue('username');
                Password = getFieldValue('password');
                console.log(Account)
                console.log(Password)
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

})

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


const WrappedNormalLoginForm = Form.create()(Login);
export default connect(null, mapDispatchToProps)(React.memo(WrappedNormalLoginForm))