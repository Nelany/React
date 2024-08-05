'use client';

import { useRouter } from 'next/navigation';
import { toggleIfReturnToRickNMorty } from '../../store/ifReturnToRickNMortySlice';
import { useDispatch } from 'react-redux';

interface GoToMainButtonProps {
  needRefresh?: boolean;
}

export const GoToMainButton = ({ needRefresh }: GoToMainButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const navigateToMain = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem('searchQuery', '');
    router.push('/');

    if (needRefresh) {
      dispatch(toggleIfReturnToRickNMorty());
    }
  };

  return (
    <button className="go-to-main-button" onClick={navigateToMain}>
      Return to Rick and Morty!
    </button>
  );
};
