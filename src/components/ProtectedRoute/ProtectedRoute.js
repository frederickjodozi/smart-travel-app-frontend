/* eslint-disable no-undef */
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ routeAuth, children, setIsLoginFormOpen }) {
  // GET AUTHORIZATION FROM STORAGE FOR SUCCESSFUL AUTH ON DIRECT URL SEARCH //
  const authorization = localStorage.getItem(routeAuth);

  if (!authorization) {
    setIsLoginFormOpen(true);
    <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
