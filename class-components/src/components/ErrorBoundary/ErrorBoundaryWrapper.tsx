import { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  children: ReactNode;
}

const ErrorBoundaryWrapper = ({ children }: Props) => {
  const { theme } = useTheme();

  return <ErrorBoundary theme={theme}>{children}</ErrorBoundary>;
};

export { ErrorBoundaryWrapper };
