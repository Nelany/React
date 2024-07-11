import { useState, useEffect } from 'react';
import './Pagination.scss';
import { useNavigate, useLocation } from 'react-router-dom';

export const Pagination = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || '1';
  const [pageNumber, setPageNumber] = useState<number>(Number(page));

  useEffect(() => {
    setPageNumber(Number(page));
  }, [page]);

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (pageNumber > 1) {
      searchParams.set('page', String(pageNumber - 1));
      navigate(`?${searchParams.toString()}`);
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    searchParams.set('page', String(pageNumber + 1));
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div className="pagination">
      <div
        className="pagination__element pagination__button pagination__button-prev"
        onClick={handlePrevClick}
      >
        {'<'}
      </div>
      <div className="pagination__element pagination__number">{pageNumber}</div>
      <div
        className="pagination__element pagination__button pagination__button-next"
        onClick={handleNextClick}
      >
        {'>'}
      </div>
    </div>
  );
};
