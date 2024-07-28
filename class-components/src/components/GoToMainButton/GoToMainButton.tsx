import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toggleIfReturnToRickNMorty } from '../../store/ifReturnToRickNMortySlice';

interface GoToMainButtonProps {
  needRefresh?: boolean;
}

export const GoToMainButton = ({ needRefresh }: GoToMainButtonProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const navigateToMain = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem('searchQuery', '');
    router.push('/');

    if (needRefresh) {
      dispatch(toggleIfReturnToRickNMorty());
    }
    //  if (needRefresh) {
    //   router.reload();
    // } else {
    //   router.push('/');
    // }
  };

  return (
    <button className="go-to-main-button" onClick={navigateToMain}>
      Return to Rick and Morty!
    </button>
  );
};
