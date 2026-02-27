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
      <div className={'theme-light-mono background light'}>
        <div id="main-app">
          <h1 className="logo">Girly Time Tracker</h1>
          <p style={{textAlign: "center", fontSize: "30px", marginTop: "20px", marginBottom: "12px"}}>There was an error:{' '}</p>
          <pre style={{whiteSpace: 'normal', textAlign: "center"}}>{error.message}</pre>
        </div>
      </div>
    </div>
  );
}
export default ErrorBoundary;