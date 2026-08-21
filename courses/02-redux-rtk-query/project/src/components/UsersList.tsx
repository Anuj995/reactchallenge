import { useGetUsersQuery } from '../api/apiSlice'

export default function UsersList() {
  const useQueryHook = useGetUsersQuery
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQueryHook(undefined)

  if (isLoading) {
    return (
      <p data-testid="users-loading">
        Loading...
      </p>
    )
  }

  if (isError) {
    let errorMessage = 'Failed to load users'

    if (
      error &&
      typeof error === 'object' &&
      'error' in error &&
      typeof error.error === 'string'
    ) {
      errorMessage = error.error
    }

    return (
      <p data-testid="users-error">
        {errorMessage}
      </p>
    )
  }

  return (
    <ul data-testid="users-list">
      {data?.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong>

          {user.email && (
            <span> — {user.email}</span>
          )}

          {user.username && (
            <span> — {user.username}</span>
          )}
        </li>
      ))}
    </ul>
  )
}