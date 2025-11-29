import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../pages/Loading/Loading'
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();
    

    if (loading) {
        return <div> 
            <Loading></Loading>
             </div>;
    }

    if (!user) {
        return <Navigate state={location.pathname} to="/login" replace></Navigate>;
    }

    return  children;
};

export default PrivateRoute;