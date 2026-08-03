import { useAuth } from '@/features/auth';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth" replace />;

  return <>{children}</>;
};
