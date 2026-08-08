import { baseApi } from '@/shared/api/baseApi';
import { supabase } from '@/shared/api/supabase';
import type { CreateTaskDto, Task, UpdateTaskDto } from '@/shared/api/types';

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('position', { ascending: true });

        if (error) return { error: { message: error.message } };

        return { data: data ?? [] };
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),

    createTask: builder.mutation<Task, CreateTaskDto>({
      queryFn: async (newTask) => {
        const { data, error } = await supabase.from('tasks').insert(newTask).select().single();

        if (error) return { error: { message: error.message } };

        return { data };
      },

      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    updateTask: builder.mutation<Task, { id: string; changes: UpdateTaskDto }>({
      queryFn: async ({ id, changes }) => {
        const { data, error } = await supabase
          .from('tasks')
          .update(changes)
          .eq('id', id)
          .select()
          .single();

        if (error) return { error: { message: error.message } };

        return { data };
      },

      invalidatesTags: (_result, _error, { id }) => [{ type: 'Tasks', id }],
    }),

    deleteTask: builder.mutation<string, string>({
      queryFn: async (id) => {
        const { error } = await supabase.from('tasks').delete().eq('id', id);

        if (error) return { error: { message: error.message } };

        return { data: id };
      },

      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    moveTasks: builder.mutation<Task[], Task[]>({
      queryFn: async (updateTasks) => {
        const { data, error } = await supabase.from('tasks').upsert(updateTasks).select();

        if (error) return { error: { message: error.message } };

        return { data: data ?? [] };
      },

      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useMoveTasksMutation,
  useUpdateTaskMutation,
} = taskApi;
