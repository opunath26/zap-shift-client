// src/routes/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useUserRole();

  if (loading || isRoleLoading) return <p>Loading...</p>;

  if (user && role === 'admin') {
    return children;
  }

  return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;