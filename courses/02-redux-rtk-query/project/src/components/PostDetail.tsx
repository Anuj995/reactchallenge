import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../api/apiSlice'

function PostDetail() {
  const { postId } = useParams<{ postId: string }>()

  const id = postId ? Number(postId) : 1

  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery(id, {
    skip: !id,
  })

  if (isLoading) {
    return (
      <div data-testid="post-detail">
        <p data-testid="post-detail-loading">Loading post...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div data-testid="post-detail">
        <p data-testid="post-detail-error">Failed to load post.</p>
      </div>
    )
  }

  return (
    <div data-testid="post-detail">
      <h3>{post?.title ?? 'Post Detail'}</h3>
      <p>{post?.body ?? 'No post content available.'}</p>
    </div>
  )
}

export default PostDetail