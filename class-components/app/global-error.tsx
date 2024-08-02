'use client';
import classNames from 'classnames';
import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const containerClasses = classNames('error-content-container');

  return (
    <div className={containerClasses}>
      <h1 className="error-content">Something went wrong!</h1>
      <img className="error-img" src="/cat.png" alt="Cat" />
      <h3 className="error-boundary-h3">Reload the application please!</h3>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
