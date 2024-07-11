const BASE_URL = 'https://rickandmortyapi.com/api/character/';

type Props = {searchString?: string, id?: string}

export const getCharacters = async (props: Props) => {
  const url = new URL(BASE_URL);

  if (props.searchString) {
    url.searchParams.set('name', props.searchString);
  } else if (props.id) {
    url.pathname += `${props.id}`;
  }

  const characters = await fetch(url).then((response) => {
    return response.json();
  });

  return characters;
};
