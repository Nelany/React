'use client';
import classNames from 'classnames';
import cookie from 'cookie';
import React from 'react';

export default function GlobalError() {
  const getTheme = () => {
    const cookies = cookie.parse(document.cookie);

    return cookies.theme || 'light';
  };

  const theme = getTheme();

  const containerClasses = classNames('error-content-container', theme);

  return (
    <div className={containerClasses}>
      <h1 className="error-content">Something went wrong!</h1>
      <img className="error-img" src="/cat.png" alt="Cat" />
      <h3 className="error-boundary-h3">Reload the application please!</h3>
    </div>
  );
}
