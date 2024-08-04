'use client';
import classNames from 'classnames';
import { getCookie } from 'cookies-next';

export default function GlobalError() {
  const theme = getCookie('theme')  || 'light';

  const containerClasses = classNames('error-content-container', theme);

  return (
    <div data-testid="error-content-container" className={containerClasses}>
      <h1 className="error-content">Something went wrong!</h1>
      <img className="error-img" src="/cat.png" alt="Cat" />
      <h3 className="error-boundary-h3">Reload the application please!</h3>
    </div>
  );
}
