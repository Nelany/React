import { useState, useEffect } from 'react';
import './Pagination.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { RootState } from '../../store/store';

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
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    searchParams.set('page', String(pageNumber + 1));
    navigate(`/?${searchParams.toString()}`);
  };

  const prevButton = classNames(
    'pagination__element',
    'pagination__button',
    'pagination__button-prev',
    {
      'pagination__button-disabled': page === '1',
    }
  );

  const nextButton = classNames(
    'pagination__element',
    'pagination__button',
    'pagination__button-next',
    {
      'pagination__button-disabled': !ifNextPage,
    }
  );

  return (
    <div className={`pagination ${theme}`}>
      <button className={prevButton} onClick={handlePrevClick}>
        {'<'}
      </button>
      <div className="pagination__element pagination__number">{pageNumber}</div>
      <button className={nextButton} onClick={handleNextClick}>
        {'>'}
      </button>
    </div>
  );
};
