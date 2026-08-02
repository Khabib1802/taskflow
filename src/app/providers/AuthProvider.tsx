import { useAuth } from '@/features/auth/hooks/useAuth';
import { Spinner } from '@heroui/react';
import type { PropsWithChildren } from 'react';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <Spinner size="lg" />
        <span className="text-default-500 text-sm font-medium">Loading</span>
      </div>
    );
  }

  return <>{children}</>;
};
