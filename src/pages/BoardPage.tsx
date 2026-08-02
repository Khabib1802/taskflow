import { Button } from '@heroui/react';
import { useAuth } from '@/features/auth';

export const BoardPage = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to Task Flow!</h1>
      <p className="text-default-600 mt-2">Your Email: {user?.email}</p>
      <Button variant="danger-soft" className="mt-4" onClick={signOut}>
        Log Out
      </Button>
    </div>
  );
};
