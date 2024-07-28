import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { RootState } from '../../store/store';

export const Pagination = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { query } = router;
  const page = query.page || '1';
  const [pageNumber, setPageNumber] = useState<number>(Number(page));
  const ifNextPage = useSelector(
    (state: RootState) => state.characters.charactersResponse?.info?.next
  );

  useEffect(() => {
    setPageNumber(Number(page));
  }, [page]);

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (pageNumber > 1) {
      router.push({
        pathname: '/',
        query: { ...query, page: String(pageNumber - 1) },
      });
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push({
      pathname: '/',
      query: { ...query, page: String(pageNumber + 1) },
    });
  };

  const prevButtonClasses = classNames(
    'pagination__element',
    'pagination__button',
    'pagination__button-prev',
    {
      'pagination__button-disabled': page === '1',
    }
  );

  const nextButtonClasses = classNames(
    'pagination__element',
    'pagination__button',
    'pagination__button-next',
    {
      'pagination__button-disabled': !ifNextPage,
    }
  );

  const paginationClasses = classNames('pagination', theme);

  return (
    <div className={paginationClasses}>
      <button className={prevButtonClasses} onClick={handlePrevClick}>
        {'<'}
      </button>
      <div className="pagination__element pagination__number">{pageNumber}</div>
      <button className={nextButtonClasses} onClick={handleNextClick}>
        {'>'}
      </button>
    </div>
  );
};
