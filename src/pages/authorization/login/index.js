import { useEffect } from 'react';
import { connect } from 'react-redux';
import { submitFormAction } from '../../../redux/action/user';
import "../../../style/author/index.scss";
import { Form, Input, Button, message as AntdMessage } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginComponent = (props) => {
    const { submitFormDispatch, loading, error, isAuthenticated } = props;
    const navigate = useNavigate();

    const onFinish = (values) => {
        submitFormDispatch(values);
    };

    useEffect(() => {
        if (isAuthenticated) {
            AntdMessage.success('Đăng nhập thành công!');
            navigate('/dashboard', { replace: true });
        }
        if (error) {
            AntdMessage.error(`Đăng nhập thất bại: ${error}`);
        }
    }, [isAuthenticated, error, navigate]);

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
        loading: state.userState.loading,
        error: state.userState.error,
        isAuthenticated: state.userState.isAuthenticated, // <-- Lấy isAuthenticated từ state
    };
};

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);