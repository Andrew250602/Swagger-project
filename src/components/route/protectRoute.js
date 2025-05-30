import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.userState.isAuthenticated);
  if (!isAuthenticated) {
    navigate('/login', { replace: true });
  }

  return children;
};

export default ProtectedRoute