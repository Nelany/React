import { useNavigate } from '@remix-run/react';
import classNames from 'classnames';
// import { parse } from 'cookie';

const NotFound = () => {
  const navigate = useNavigate();
  // const cookieHeader = document.cookie;
  // const cookies = cookieHeader ? parse(cookieHeader) : {};
  // const theme = cookies.theme || 'light';
  const theme = 'light';

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
