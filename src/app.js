import LoginPage from "./pages/authorization/login";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Vẫn dùng useSelector cho ProtectedRoute

// Import các trang Private của bạn
// Ví dụ:
import DashboardPage from "./pages/private/dashboard";
import ProfilePage from "./pages/private/profile";
// Component ProtectedRoute
import ProtectedRoute from "./components/route/protectRoute";

function App() {
  // Lấy trạng thái xác thực để xử lý route gốc
  const isAuthenticated = useSelector((state) => state.userState.isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {/* Route gốc / sẽ chuyển hướng tùy thuộc vào trạng thái đăng nhập */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace /> // Nếu đã đăng nhập, về dashboard
            ) : (
              <Navigate to="/login" replace />     // Nếu chưa, về trang đăng nhập
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        {/* Bạn có thể thêm các Public routes khác như /register */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        {/* Private Routes - Sử dụng ProtectedRoute */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage /> {/* <-- Đảm bảo bạn đã tạo và import DashboardPage */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage /> {/* <-- Đảm bảo bạn đã tạo và import ProfilePage */}
            </ProtectedRoute>
          }
        />

        {/* Catch-all route cho các đường dẫn không tồn tại */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;