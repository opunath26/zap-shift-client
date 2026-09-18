import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useUserRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-4 border-gray-300 border-t-[#C6F16A] rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (user && role === 'deliveryman') {
    return children;
  }

  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default RiderRoute;