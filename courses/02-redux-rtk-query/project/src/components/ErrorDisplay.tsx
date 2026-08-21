interface ErrorDisplayProps {
  error?: unknown
  onRetry?: () => void
}

export default function ErrorDisplay({
  error,
  onRetry,
}: ErrorDisplayProps) {
  let message = 'Something went wrong. Please try again.'

  if (
    error &&
    typeof error === 'object' &&
    'error' in error &&
    typeof error.error === 'string'
  ) {
    message = error.error
  }

  return (
    <div data-testid="error-display">
      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          data-testid="retry-btn"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  )
}