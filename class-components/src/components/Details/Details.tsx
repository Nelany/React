import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Details.scss';
import { Loader } from '../Loader/Loader';
import { useTheme } from '../../hooks/useTheme';
import { useGetByIdQuery } from '../../api/rtkApi';

export const Details = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const { data: character, isLoading, isError } = useGetByIdQuery(id || '');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || '1';

  const handleClose = () => {
    searchParams.set('page', String(page));
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <div data-testid="details" className={`details ${theme}`}>
      <button className="details__close-button" onClick={handleClose}>
        X
      </button>

      <Loader isLoading={isLoading} isError={isError} />

      {!isLoading && character && !character?.error && (
        <>
          <img className="details__img" src={character.image} alt="img" />
          <h2 className="h2-details">{character.name}</h2>
          <h4 className="h4-details">{`Status: ${character.status}`}</h4>
          <h4 className="h4-details">{`Species: ${character.species}`}</h4>
          {character.type && (
            <h4 className="h4-details">{`Type: ${character.type}`}</h4>
          )}
          <h4 className="h4-details">{`Last known location: ${character.location.name}`}</h4>
          <h4 className="h4-details">{`Gender: ${character.gender}`}</h4>
          <h4 className="h4-details">{`Origin: ${character.origin.name}`}</h4>
          <h4
            data-testid="detailsCreated"
            className="h4-details"
          >{`Created: ${new Date(character.created).toLocaleString()}`}</h4>
        </>
      )}
    </div>
  );
};
