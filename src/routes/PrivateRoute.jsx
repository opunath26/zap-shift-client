import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../pages/Loading/Loading'
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();

    if (loading) {
        return <div> 
            <Loading></Loading>
             </div>;
    }

    if (!user) {
        return <Navigate to="/login" replace></Navigate>;
    }

    return  children;
};

export default PrivateRoute;