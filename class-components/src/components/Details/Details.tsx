'use client';
import classNames from 'classnames';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useGetByIdQuery } from '../../api/rtkApi';
import { useTheme } from '../../hooks/useTheme';
import { Loader } from '../Loader/Loader';

export const Details = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const {
    data: character,
    isLoading,
    isFetching,
    isError,
  } = useGetByIdQuery(id);
  const page = searchParams.get('page') || '1';

  const loaded = !(isLoading || isFetching);

  const handleClose = () => {
    router.push(`/?page=${page}`, {
      scroll: false,
    });
  };

  const detailsClasses = classNames('details', theme);

  return (
    <div data-testid="details" className={detailsClasses}>
      <button className="details__close-button" onClick={handleClose}>
        X
      </button>

      <Loader isLoading={!loaded} isError={isError} />

      {loaded && character && !character?.error && (
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
};
