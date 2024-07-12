const BASE_URL = 'https://rickandmortyapi.com/api/character/';

type Props = { searchString?: string; id?: string; page?: string };

export const getCharacters = async (props: Props) => {
  const url = new URL(BASE_URL);

  if (props.page) {
    const page = String(
      !isNaN(Number(props.page)) && Number.isInteger(Number(props.page))
        ? Number(props.page)
        : 99999999999999999999999999n
    );
    url.searchParams.set('page', page);

    if (props.searchString) {
      url.searchParams.set('name', props.searchString);
    }
  } else if (props.id) {
    url.pathname += `${props.id}`;
  }

  const characters = await fetch(url).then((response) => {
    return response.json();
  });

  return characters;
};
