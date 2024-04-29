import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  path: string;
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const { isAuthenticated } = useAuth();

  return (
    isAuthenticated ? (
      // Render protected component within Outlet
      <>
        <Outlet />
        {element}
      </>
    ) : (
      <Navigate to="/login" replace /> // Redirect if not authenticated
    )
  );
};

export default PrivateRoute;