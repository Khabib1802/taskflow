import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthLoading, selectUser } from '../model/selectors';
import { setUser } from '../model/authSlice';
import { supabase } from '@/shared/api/supabase';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsAuthLoading);

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
