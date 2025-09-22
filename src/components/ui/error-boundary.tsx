import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to monitoring service (e.g., Sentry)
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} retry={this.handleRetry} />;
      }

      return <DefaultErrorFallback error={this.state.error!} retry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback = ({ error, retry }: { error: Error; retry: () => void }) => (
  <Card className="max-w-md mx-auto mt-8 border-destructive">
    <CardHeader className="text-center">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>
      <CardTitle className="text-destructive">Something went wrong</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        We encountered an unexpected error. Please try again.
      </p>
      
      {process.env.NODE_ENV === 'development' && (
        <details className="text-xs bg-muted p-3 rounded">
          <summary className="cursor-pointer font-medium">Error Details (Development)</summary>
          <pre className="mt-2 whitespace-pre-wrap break-words">
            {error.message}
            {error.stack}
          </pre>
        </details>
      )}
      
      <div className="flex gap-2 justify-center">
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reload Page
        </Button>
        <Button onClick={retry}>
          Try Again
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Hook for error handling in functional components
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    console.error('Error:', error, errorInfo);
    // You could also send to an error tracking service here
  };
};