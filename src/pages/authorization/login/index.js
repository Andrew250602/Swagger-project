import React, { useEffect } from 'react'; // Import useEffect
import { connect } from 'react-redux';
import { submitFormAction } from '../../../redux/action/user';
import "../../../style/author/index.scss";
import { Form, Input, Button, message as AntdMessage } from 'antd'; // Import message từ Ant Design
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginComponent = (props) => {
    const { submitFormDispatch, loading, error, isAuthenticated } = props; // Lấy isAuthenticated từ props
    const navigate = useNavigate(); // Khởi tạo hook useNavigate

    const onFinish = (values) => {
        submitFormDispatch(values);
    };

    // Sử dụng useEffect để theo dõi trạng thái đăng nhập
    useEffect(() => {
        if (isAuthenticated) {
            AntdMessage.success('Đăng nhập thành công!'); // Hiển thị thông báo thành công
            navigate('/dashboard', { replace: true }); // Chuyển hướng đến trang dashboard
        }
        if (error) {
            AntdMessage.error(`Đăng nhập thất bại: ${error}`); // Hiển thị thông báo lỗi
        }
    }, [isAuthenticated, error, navigate]); // Dependencies: isAuthenticated, error, navigate

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