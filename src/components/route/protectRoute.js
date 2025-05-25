// src/components/Auth/ProtectedRoute.js
import React from 'react';
import { connect } from 'react-redux'; // Sử dụng connect nếu bạn thích
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Kết nối ProtectedRoute với Redux state
const mapStateToProps = (state) => ({
  isAuthenticated: state.userState.isAuthenticated, // Lấy isAuthenticated từ userState
});

export default connect(mapStateToProps)(ProtectedRoute);