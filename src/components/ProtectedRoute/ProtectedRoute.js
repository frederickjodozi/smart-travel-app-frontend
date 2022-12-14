import { Navigate } from 'react-router-dom';

function ProtectedRoute({ routeAuth, children }) {
  if (routeAuth === true || routeAuth.length > 0) {
    return children;
  }
  return <Navigate to="/smart-travel-app-frontend/" />;
}

export default ProtectedRoute;
