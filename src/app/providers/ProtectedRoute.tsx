import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';

export const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to="/auth" replace />;

  return <>{children}</>;
};
