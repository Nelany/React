import { useState, useEffect } from 'react';
import './Pagination.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export const Pagination = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || '1';
  const [pageNumber, setPageNumber] = useState<number>(Number(page));
  const ifNextPage = useSelector(
    (state: RootState) => state.charactersResponse.data?.info?.next
  );

  useEffect(() => {
    setPageNumber(Number(page));
  }, [page]);

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (pageNumber > 1) {
      searchParams.set('page', String(pageNumber - 1));
      navigate(`/?${searchParams.toString()}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    searchParams.set('page', String(pageNumber + 1));
    navigate(`/?${searchParams.toString()}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={`pagination ${theme}`}>
      <div
        className={
          page === '1'
            ? 'pagination__element pagination__button pagination__button-next pagination__button-disabled'
            : 'pagination__element pagination__button pagination__button-prev'
        }
        onClick={handlePrevClick}
      >
        {'<'}
      </div>
      <div className="pagination__element pagination__number">{pageNumber}</div>
      <div
        className={
          ifNextPage
            ? 'pagination__element pagination__button pagination__button-next'
            : 'pagination__element pagination__button pagination__button-next pagination__button-disabled'
        }
        onClick={handleNextClick}
      >
        {'>'}
      </div>
    </div>
  );
};
