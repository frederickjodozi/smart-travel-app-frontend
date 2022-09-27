import { React } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ routeAuth, children }) {
  if (routeAuth) {
    return children;
  }
  return <Navigate to="/" />;
}

export default ProtectedRoute;
