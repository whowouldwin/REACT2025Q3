import React, { type ReactElement, type PropsWithChildren } from 'react';

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback: ReactElement;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
