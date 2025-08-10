import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { ApiResponse, Character } from '@/utils/types/rickAndMorty.ts';
export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<ApiResponse, { name: string; page: number }>({
      query: ({ name, page }) =>
        `character/?name=${encodeURIComponent(name)}&page=${page}`,
    }),
    getCharacterById: builder.query<Character, string | number>({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } =
  rickAndMortyApi;
