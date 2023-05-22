import React, { Component } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

const ProtectedRoute = ({ to, component: Component, ...rest }) => {
  const location = useLocation();

  return (
    <div>
      {!getCurrentUser() ? (
        <Navigate state={{ from: location }} to="/login" replace />
      ) : (
        <Component {...rest} />
      )}
    </div>
  );
};

export default ProtectedRoute;
