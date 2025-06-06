import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const TOKEN_COOKIE_NAME = "authToken"; 
  const token = Cookies.get(TOKEN_COOKIE_NAME);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;