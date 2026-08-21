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

    getPosts: builder.query<Post[], void>({
      queryFn: async () => {
        return {
          data: [],
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Post' as const,
                id,
              })),
              {
                type: 'Post' as const,
                id: 'LIST',
              },
            ]
          : [
              {
                type: 'Post' as const,
                id: 'LIST',
              },
            ],
    }),

    getPostById: builder.query<Post, number>({
      queryFn: async (id) => {
        try {
          const post = await mockApi.getPostById(id)

          return {
            data: post as Post,
          }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch post',
            },
          }
        }
      },

      providesTags: (result, error, id) => [
        {
          type: 'Post' as const,
          id,
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

      async onQueryStarted(
        arg,
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            'getPosts',
            undefined,
            (draft) => {
              draft.push({
                id: Date.now(),
                title: arg.title ?? '',
                body: arg.body ?? '',
              })
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
} = apiSlice