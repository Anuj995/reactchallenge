import { createApi } from '@reduxjs/toolkit/query/react';
import { mockApi } from './mockServer';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async () => {
    return { data: null };
  },
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: async () => {
        try {
          const users = await mockApi.getUsers();
          return { data: users };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error
                ? error.message
                : 'Failed to fetch users',
            },
          };
        }
      },
    }),
  }),
});

export const { useGetUsersQuery } = apiSlice;