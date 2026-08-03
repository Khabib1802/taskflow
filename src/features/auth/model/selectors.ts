import type { AuthRootState } from './types';

export const selectAuth = (state: AuthRootState) => state.auth;
export const selectUser = (state: AuthRootState) => state.auth.user;
export const selectIsAuthLoading = (state: AuthRootState) => state.auth.isLoading;
