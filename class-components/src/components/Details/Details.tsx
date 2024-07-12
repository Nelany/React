import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Details.scss';
import { useEffect, useState } from 'react';
import { getCharacters } from '../../api/api';
import { Loader } from '../Loader/Loader';
import { Character } from '../../types/types';

export const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [character, setCharacter] = useState<Character | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || '1';

  const handleClose = () => {
    navigate(`/?${page}`);
  };

  const getDetails = async () => {
    setIsLoading(true);

    setTimeout(async () => {
      const detailsResponse = await getCharacters({ id: id });

      setCharacter(detailsResponse);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (id) {
      getDetails();
    }
  }, [id]);

  return (
    <div className="details">
      <button className="details__close-button" onClick={handleClose}>
        X
      </button>

      <Loader isLoading={isLoading} response={character || {}} />

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
          <h4 className="h4-details">{`Created: ${new Date(character.created).toLocaleString()}`}</h4>
        </>
      )}
    </div>
  );
};
