import { GoToMainButton } from '../GoToMainButton/GoToMainButton';
import './Loader.scss';

type Props = {
  isLoading: boolean;
  isError: boolean;
  needRefresh?: boolean;
};

export const Loader = ({ isLoading, isError, needRefresh }: Props) => {
  return (
    <>
      {isLoading && (
        <div data-testid="loader" className="spinner-container">
          <img className="spinner" src="/spinner.png" alt="Loading..." />
        </div>
      )}
      {!isLoading && isError && (
        <>
          <h4 className="error-message">There is nothing here!</h4>
          <GoToMainButton needRefresh={needRefresh} />
        </>
      )}
    </>
  );
};
