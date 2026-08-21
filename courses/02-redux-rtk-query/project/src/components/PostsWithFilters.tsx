import { useMemo } from 'react'
import { useGetPostsQuery } from '../api/apiSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setSortBy } from '../store/slices/filtersSlice'

export default function PostsWithFilters() {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery(undefined)

  const sortBy = useAppSelector((state) => state.filters.sortBy)
  const dispatch = useAppDispatch()

  const sortedPosts = useMemo(() => {
    const result = [...posts]

    if (sortBy === 'newest') {
      return result.sort((a, b) => b.id - a.id)
    }

    if (sortBy === 'oldest') {
      return result.sort((a, b) => a.id - b.id)
    }

    return result.sort((a, b) =>
      a.title.localeCompare(b.title)
    )
  }, [posts, sortBy])

  if (isLoading) {
    return <p data-testid="posts-with-filters">Loading...</p>
  }

  if (isError) {
    return <p data-testid="posts-with-filters">Failed to load posts.</p>
  }

  return (
    <div data-testid="posts-with-filters">
      <div data-testid="filter-controls">
        <label htmlFor="post-sort">Sort posts:</label>

        <select
          id="post-sort"
          value={sortBy}
          onChange={(event) =>
            dispatch(
              setSortBy(
                event.target.value as
                  | 'newest'
                  | 'oldest'
                  | 'alphabetical'
              )
            )
          }
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      <ul>
        {sortedPosts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            {post.body && <span> — {post.body}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}