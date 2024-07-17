import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, CharacterResponse } from '../types/types';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character/',
  }),
  endpoints: (builder) => ({
    getAll: builder.query<CharacterResponse, void>({
      query: () => '',
    }),
    getById: builder.query<Character, string>({
      query: (id) => id,
    }),
  }),
});

export const { useGetAllQuery, useGetByIdQuery } = rtkApi;
