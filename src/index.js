import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// Nếu dùng Ant Design v4:
// import { ConfigProvider } from 'antd';
// Nếu dùng Ant Design v5+:
import { App as AntdApp } from 'antd'; // Ví dụ, đổi tên để tránh xung đột với App của bạn
import App from './App';
import  store  from './redux/storeReducer'; // Đảm bảo đường dẫn đúng

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Chọn một trong hai dòng dưới đây tùy theo phiên bản Ant Design của bạn */}
      {/* <ConfigProvider> */}
      <AntdApp> {/* Sử dụng App component từ Ant Design */}
        <App />
      </AntdApp>
      {/* </ConfigProvider> */}
    </Provider>
  </React.StrictMode>
);