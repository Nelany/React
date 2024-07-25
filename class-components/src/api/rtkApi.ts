import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, CharacterResponse } from '../types/types';

type GetCharactersParams = { searchString?: string; page?: string };

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character/',
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharacterResponse, GetCharactersParams>({
      query: ({ searchString, page }) => {
        const searchParams = new URLSearchParams();
        if (page) searchParams.set('page', page);
        if (searchString) searchParams.set('name', searchString);

        return `?${searchParams}`;
      },
    }),
    getById: builder.query<Character, string>({
      query: (id) => id,
    }),
  }),
});

export const { useLazyGetCharactersQuery, useGetByIdQuery } = rtkApi;
