import './Pagination.scss';

export const Pagination = () => {
  return (
    <div className="pagination">
      <div className="pagination__element pagination__button">{`<`}</div>
      <div className="pagination__element pagination__number">1</div>
      <div className="pagination__element pagination__button">{'>'}</div>
    </div>
  );
};
