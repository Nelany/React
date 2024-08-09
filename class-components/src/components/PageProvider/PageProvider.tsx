import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { ErrorBoundaryWrapper } from '../ErrorBoundary/ErrorBoundaryWrapper';
import Main from '../Main/Main';

interface PageProps {
  children?: ReactNode;
}

const PageProvider = ({ children }: PageProps) => {
  return (
    <ThemeProvider>
      <ErrorBoundaryWrapper>
        <Provider store={store}>
          <Main>{children}</Main>
        </Provider>
      </ErrorBoundaryWrapper>
    </ThemeProvider>
  );
};

export default PageProvider;
