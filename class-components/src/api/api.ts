const BASE_URL = 'https://rickandmortyapi.com/api/character/';

export const getCharacters = async (searchString?: string) => {
  const url = new URL(BASE_URL);

  if (searchString) {
    url.searchParams.set('name', searchString);
  }
  const characters = await fetch(url).then((response) => {
    return response.json();
  });

  return characters;
};
