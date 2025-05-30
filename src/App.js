import LoginPage from "./pages/authorization/login";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TabLayout from "./components/layout/layout";
import DashboardPage from "./pages/private/dashboard";
import ProfilePage from "./pages/private/profile";
import ProtectedRoute from "./components/route/protectRoute";

function App() {
    const isAuthenticated = useSelector((state) => state.userState.isAuthenticated);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<TabLayout />}>
                    <Route index element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
                    <Route path="dashboard" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } />
                    <Route path="profile" element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    } />
                </Route>
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
