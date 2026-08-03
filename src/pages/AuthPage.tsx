import { useAuth } from '@/features/auth';
import { supabase } from '@/shared/api/supabase';
import { Button, Input, Spinner, Tabs } from '@heroui/react';
import type { AuthError } from '@supabase/supabase-js';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

type SelectedTab = 'login' | 'register';

export const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [selectedTab, setSelectedTab] = useState<SelectedTab>('login');

  const { user } = useAuth();
  if (user) {
    return <Navigate to="/board" replace />;
  }

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      if (selectedTab === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error);

        console.log('Login success: ', data);
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) setError(error);

        console.log('Register success: ', data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsPending(() => false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="bg-background w-full max-w-md rounded-xl border p-6 shadow-sm">
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as SelectedTab)}
          className="mb-6 w-full"
        >
          <Tabs.ListContainer>
            <Tabs.List className="grid w-full grid-cols-2">
              <Tabs.Tab id="login">
                Login
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="register">
                Register
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(() => event.target.value)}
              type="text"
            />
            <Input
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(() => event.target.value)}
              type="password"
            />

            {error && <p className="text-sm text-red-500">{error.message}</p>}

            <Button
              type="submit"
              isPending={isPending}
              isDisabled={!email || !password}
              className="relative mt-2 w-full items-center justify-center"
            >
              {isPending && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spinner size="sm" color="current" />
                </div>
              )}
              <span className={isPending ? 'opacity-0' : 'opacity-100'}>
                {selectedTab === 'login' ? 'Sign In' : 'Sign Up'}
              </span>{' '}
            </Button>
          </form>

          <Tabs.Panel id="login">
            <p className="text-muted-foreground mt-2 text-center text-xs">
              Welcome back! Please enter your details.
            </p>
          </Tabs.Panel>
          <Tabs.Panel id="register">
            <p className="text-muted-foreground mt-2 text-center text-xs">
              Create an account to get started.
            </p>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};
