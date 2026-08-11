import { Component, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch() {
    // Intentionally empty
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div id="error-boundary-fallback">
          <h2>Something went wrong</h2>

          <p>
            Please try again.
          </p>

          <button
            id="error-retry"
            onClick={this.handleRetry}
          >
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary