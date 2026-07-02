import React from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorState } from '@/components/ui/error-state'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  resetKey?: string
}

const ErrorBoundaryFallback = ({ message }: { message?: string }) => {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <ErrorState
        title={t('ui.pageError')}
        description={message || t('ui.unknownError')}
        retry={() => window.location.reload()}
      />
    </div>
  )
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: undefined })
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return <ErrorBoundaryFallback message={this.state.error?.message} />
    }

    return this.props.children
  }
}

export { ErrorBoundary }
