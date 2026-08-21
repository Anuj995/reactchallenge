import { useGetUsersQuery } from '../api/apiSlice'
import ErrorDisplay from './ErrorDisplay'

export default function UsersList() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery(undefined)

  if (isLoading) {
    return (
      <p data-testid="users-loading">
        Loading users...
      </p>
    )
  }

  if (isError) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={refetch}
      />
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