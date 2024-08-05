import classNames from 'classnames';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default function NotFound() {
  const theme = getCookie('theme', { cookies }) || 'light';

  const containerClasses = classNames('error-content-container', theme);
  const buttonClasses = classNames('go-to-main-button', theme);

  return (
    <div className={containerClasses}>
      <h1 className="error-content">Ooops... Page not found!</h1>
      <img className="error-img" src="/cat.png" alt="Cat" />
      <Link href="/">
        <button className={buttonClasses}>Go to Main</button>
      </Link>
    </div>
  );
}
