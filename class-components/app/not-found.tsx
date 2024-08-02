import Link from 'next/link';

interface NotFoundProps {
  theme: string;
}

export default function NotFound({ theme }: NotFoundProps) {
  const containerClasses = `error-content-container ${theme}`;

  return (
    <div className={containerClasses}>
      <h1 className="error-content">Ooops... Page not found!</h1>
      <img className="error-img" src="/cat.png" alt="Cat" />
      <Link href="/">
        <a className="go-to-main-button">Go to Main</a>
      </Link>
    </div>
  );
}
