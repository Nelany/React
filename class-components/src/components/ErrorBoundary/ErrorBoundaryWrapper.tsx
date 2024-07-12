import { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface Props {
  children: ReactNode;
}

const ErrorBoundaryWrapper = ({ children }: Props) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export { ErrorBoundaryWrapper };
