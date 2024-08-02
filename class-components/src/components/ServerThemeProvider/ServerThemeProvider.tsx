import cookie from 'cookie';
import { GetServerSideProps } from 'next';
import React, { ReactNode } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || '');
  const theme = cookies.theme || 'light';

  return {
    props: {
      theme,
    },
  };
};

interface ThemedComponentProps {
  theme: string;
}

export default function ServerThemeProvider({
  theme,
  children,
}: {
  theme: string;
  children: ReactNode;
}) {
  const childrenWithTheme = React.Children.map(children, (child) => {
    if (
      React.isValidElement<ThemedComponentProps>(child) &&
      'theme' in child.props
    ) {
      return React.cloneElement(child, { theme });
    }

    return child;
  });

  return <>{childrenWithTheme}</>;
}
