import type { User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export type AuthRootState = {
  auth: AuthState;
};
