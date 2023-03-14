import { Navigate } from 'react-router-dom';

function ProtectedRoute({ routeAuth, children, setIsLoginFormOpen }) {
  if (routeAuth === true) {
    return children;
  }
  setIsLoginFormOpen(true);
  return <Navigate to="/smart-travel-app-frontend/" />;
}

export default ProtectedRoute;
