import LoginPage from "./pages/authorization/login";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Vẫn dùng useSelector cho ProtectedRoute
import TabLayout from "./components/layout/layout";
import DashboardPage from "./pages/private/dashboard";
import ProfilePage from "./pages/private/profile";
import ProtectedRoute from "./components/route/protectRoute";

function App() {
    const isAuthenticated = useSelector((state) => state.userState.isAuthenticated);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
                    }
                />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<TabLayout />}>
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                    </Route>
                </Route>

                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;