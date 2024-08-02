import classNames from 'classnames';
import { GoToMainButton } from '../src/components/GoToMainButton/GoToMainButton';
import { useTheme } from '../src/hooks/useTheme';
import React from 'react';

export default function NotFound() {
  const { theme } = useTheme();

  const containerClasses = classNames('error-content-container', theme);

  return (
    <div className={containerClasses}>
      <h1 className="error-content">Ooops... Page not found!</h1>
      <img className="error-img" src="/cat.png" alt="Cat" />
      <GoToMainButton />
    </div>
  );
}
