import { useEffect } from 'react';
import { connect } from 'react-redux';
import { submitFormAction } from '../../../redux/action/user';
import "../../../style/author/index.scss";
import { Form, Input, Button } from 'antd';

const LoginComponent = (props) => {
    const { submitFormDispatch, loading, error, message } = props;

    const onFinish = (values) => {
        submitFormDispatch(values);
    };

    return (
        <div className="login-wrapper">
            <div className="login-header">
                <h2>LOGIN</h2>
            </div>
            <Form className="login-form" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                    name="passWord"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Sign in
                    </Button>
                </Form.Item>
                <div className="links">
                    <a href="#">Forgot Password</a>
                    <a href="#">Sign up</a>
                </div>
            </Form>
            {error && <div className="error-message">{message}</div>}
        </div>
    );
};

// Function to map dispatch to props
const mapDispatchToProps = (dispatch) => ({
    submitFormDispatch: (values) => dispatch(submitFormAction(values)),
});

// Function to map state to props
const mapStateToProps = (state) => {
    return {
        message: state.message,
        users: state.userState.users,
        loading: state.userState.loading,
        error: state.userState.error,
    };
};

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);