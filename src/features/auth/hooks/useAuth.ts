import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setUser } from '../model/authSlice';
import { supabase } from '@/shared/api/supabase';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('User session:', session);
      dispatch(setUser(session?.user ?? null));
    });

    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(session?.user ?? null));
    }).data.subscription;

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, isLoading, signOut };
};
