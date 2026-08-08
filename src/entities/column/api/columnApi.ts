import { baseApi } from '@/shared/api/baseApi';
import { supabase } from '@/shared/api/supabase';
import type { Column, CreateColumnDto, UpdateColumnDto } from '@/shared/api/types';

export const columnApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getColumns: builder.query<Column[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('columns')
          .select('*')
          .order('position', { ascending: true });

        if (error) return { error: { message: error.message } };
        return { data: data ?? [] };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Columns' as const, id })),
              { type: 'Columns', id: 'LIST' },
            ]
          : [{ type: 'Columns', id: 'LIST' }],
    }),

    createColumn: builder.mutation<Column, CreateColumnDto>({
      queryFn: async (newColumn) => {
        const { data, error } = await supabase.from('columns').insert(newColumn).select().single();

        if (error) return { error: { message: error.message } };
        return { data };
      },
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),

    updateColumn: builder.mutation<Column, { id: string; changes: UpdateColumnDto }>({
      queryFn: async ({ id, changes }) => {
        const { data, error } = await supabase
          .from('columns')
          .update(changes)
          .eq('id', id)
          .select()
          .single();

        if (error) return { error: { message: error.message } };
        return { data };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Columns', id }],
    }),

    deleteColumn: builder.mutation<string, string>({
      queryFn: async (id) => {
        const { error } = await supabase.from('columns').delete().eq('id', id);

        if (error) return { error: { message: error.message } };
        return { data: id };
      },
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),

    reorderColumns: builder.mutation<Column[], Column[]>({
      queryFn: async (reorderedColumns) => {
        const { data, error } = await supabase.from('columns').upsert(reorderedColumns).select();

        if (error) return { error: { message: error.message } };
        return { data: data ?? [] };
      },
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
  useReorderColumnsMutation,
} = columnApi;
