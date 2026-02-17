import * as React from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  FallbackComponent: React.ComponentType<{ error: Error }>;
};

type ErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (error) {
      const { FallbackComponent } = this.props;
      return <FallbackComponent error={error} />;
    }

    return this.props.children;
  }
}

export function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
    </div>
  );
}
export default ErrorBoundary;