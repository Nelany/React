import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Error() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light';
    setTheme(cookieTheme);
  }, []);

  const containerClasses = classNames('error-content-container', theme);

  return (
    <div data-testid="error-content-container" className={containerClasses}>
      <h1 className="error-content">Something went wrong!</h1>
      <img className="error-img" src="/cat.png" alt="Cat" />
      <h3 className="error-boundary-h3">Reload the application please!</h3>
    </div>
  );
}
