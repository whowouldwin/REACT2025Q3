import { Component, type ErrorInfo, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-700 mb-4">
            There is an error loading the data. Please try again later.
          </p>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono overflow-auto max-h-40">
            {this.state.error?.message}
          </div>
          <button
            onClick={() => window.location.reload()}
            className={twMerge(
              'px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition'
            )}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
