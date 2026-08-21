import { createApi } from '@reduxjs/toolkit/query/react'
import { mockApi } from './mockServer'

interface User {
  id: number
  name: string
  email: string
  username?: string
}

interface Post {
  id: number
  title: string
  body?: string
}

export const apiSlice = createApi({
  reducerPath: 'api',

  tagTypes: ['User', 'Post'],

  baseQuery: async () => {
    return { data: null }
  },

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          const users = await mockApi.getUsers()

          return {
            data: users as User[],
          }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch users',
            },
          }
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'User' as const,
                id,
              })),
              {
                type: 'User' as const,
                id: 'LIST',
              },
            ]
          : [
              {
                type: 'User' as const,
                id: 'LIST',
              },
            ],
    }),

    addPost: builder.mutation<Post, Partial<Post>>({
      queryFn: async (post) => {
        return {
          data: {
            id: Date.now(),
            title: post.title ?? '',
            body: post.body ?? '',
          },
        }
      },

      invalidatesTags: [
        {
          type: 'Post',
          id: 'LIST',
        },
      ],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useAddPostMutation,
} = apiSlice