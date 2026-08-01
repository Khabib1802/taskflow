import type { Tables, TablesInsert, TablesUpdate } from './supabase.types';

export type Column = Tables<'columns'>;
export type Task = Tables<'tasks'>;
export type Profile = Tables<'profiles'>;

export type CreateColumnDto = TablesInsert<'columns'>;
export type CreateTaskDto = TablesInsert<'tasks'>;

export type UpdateColumnDto = TablesUpdate<'columns'>;
export type UpdateTaskDto = TablesUpdate<'tasks'>;

export type Priority = 'low' | 'medium' | 'high';
