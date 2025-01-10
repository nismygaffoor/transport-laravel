// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
    const isAuthenticated = true; // Add your authentication logic
    const userRole = 'admin'; // Get user role from context or state

    return (
        <Route
            {...rest}
            element={
                isAuthenticated ? (
                    userRole === role ? (
                        <Component />
                    ) : (
                        <Navigate to="/" />
                    )
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
