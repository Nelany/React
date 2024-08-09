import { useNavigate } from '@remix-run/react';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const NotFound = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light';
    setTheme(cookieTheme);
  }, []);

  const containerClasses = classNames('error-content-container', theme);
  const buttonClasses = classNames('go-to-main-button', theme);

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <div className={containerClasses}>
      <h1 className="error-content">Ooops... Page not found!</h1>
      <img className="error-img" src="/cat.png" alt="Cat" />

      <button className={buttonClasses} onClick={handleClick}>
        Go to Main
      </button>
    </div>
  );
};

export default NotFound;
