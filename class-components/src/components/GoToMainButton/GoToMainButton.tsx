'use client';

import { useRouter } from 'next/navigation';

interface GoToMainButtonProps {
  needRefresh?: boolean;
}

export const GoToMainButton = ({ needRefresh }: GoToMainButtonProps) => {
  const router = useRouter();

  const navigateToMain = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem('searchQuery', '');
    router.push('/');

    if (needRefresh) {
      router.refresh();
    }
  };

  return (
    <button className="go-to-main-button" onClick={navigateToMain}>
      Return to Rick and Morty!
    </button>
  );
};
