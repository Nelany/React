import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { rtkApi } from '../../src/api/rtkApi';
import { Loader } from '../../src/components/Loader/Loader';
import { useTheme } from '../../src/hooks/useTheme';
import { store } from '../../src/store/store';
import { Character } from '../../src/types/types';
interface DetailsProps {
  character: Character | null;
  isError: boolean;
}

export default function Details({ character, isError }: DetailsProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const location = router.asPath;
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const page = searchParams.get('page') || '1';

  const handleClose = () => {
    searchParams.set('page', String(page));
    router.push(`/?${searchParams.toString()}`, undefined, { scroll: false });
  };

  const detailsClasses = classNames('details', theme);

  return (
    <div data-testid="details" className={detailsClasses}>
      <button className="details__close-button" onClick={handleClose}>
        X
      </button>

      <Loader isLoading={!character} isError={isError} />

      {character && !character?.error && (
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

interface Params extends ParsedUrlQuery {
  id: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;
  const { getById } = rtkApi.endpoints;

  const result = await store.dispatch(getById.initiate(id));

  return {
    props: {
      character: result.data || null,
      isError: !!result.error,
    },
  };
};
