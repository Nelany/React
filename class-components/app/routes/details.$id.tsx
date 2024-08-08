import { LoaderFunction } from '@remix-run/node';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { rtkApi } from '../../src/api/rtkApi';
import { Loader } from '../../src/components/Loader/Loader';
import { useTheme } from '../../src/hooks/useTheme';
import { store } from '../../src/store/store';
import { Character } from '../../src/types/types';
import { useLoaderData, useLocation, useNavigate } from '@remix-run/react';

interface LoaderData {
  character: Character | null;
  isError: boolean;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  const { getById } = rtkApi.endpoints;

  if (id) {
    const result = await store.dispatch(getById.initiate(id));

    return {

        character: result.data || null,
        isError: !!result.error,

    };
  }

  return { character: null, isError: true  };
};

export default function Details() {
  const { character, isError } = useLoaderData<LoaderData>();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || '1';

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (character !== null || isError) {
      setIsLoading(false);
    }
  }, [character, isError]);

  // useEffect(() => {
  //   Router.events.on('routeChangeStart', () => {
  //     setIsLoading(true);
  //   });
  //   Router.events.on('routeChangeComplete', () => {
  //     setIsLoading(false);
  //   });
  //   Router.events.on('routeChangeError', () => {
  //     setIsLoading(false);
  //   });
  // }, [Router]);

  const handleClose = () => {
    searchParams.set('page', String(page));
    navigate(`/?${searchParams.toString()}`);
  };

  const detailsClasses = classNames('details', theme);

  return (
    <div data-testid="details" className={detailsClasses}>
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
          <h4 className="h4-details">{`Last known location: ${character.location?.name}`}</h4>
          <h4 className="h4-details">{`Gender: ${character.gender}`}</h4>
          <h4 className="h4-details">{`Origin: ${character.origin?.name}`}</h4>
          <h4
            data-testid="detailsCreated"
            className="h4-details"
          >{`Created: ${new Date(character.created).toLocaleString()}`}</h4>
        </>
      )}
    </div>
  );
}