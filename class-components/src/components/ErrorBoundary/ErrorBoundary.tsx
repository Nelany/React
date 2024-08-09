import classNames from 'classnames';
import { Component, ErrorInfo, ReactNode } from 'react';
interface Props {
  children: ReactNode;
  theme: string;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      const containerClasses = classNames(
        'error-content-container',
        this.props.theme
      );

      return (
        <div className={containerClasses}>
          <h1 className="error-content">Something went wrong!</h1>
          <img className="error-img" src="/cat.png" alt="Cat" />
          <h3 className="error-boundary-h3">Reload the application please!</h3>
        </div>
      );
    }

    return this.props.children;
  }
}
