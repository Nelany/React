import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import Main from '../Main/Main';

interface PageProps {
  children?: ReactNode;
}

const PageProvider = ({ children }: PageProps) => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Main>{children}</Main>
      </Provider>
    </ThemeProvider>
  );
};

export default PageProvider;
