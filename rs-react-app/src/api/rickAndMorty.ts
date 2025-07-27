import { FetchError } from '../error/FetchError.ts';

import type { ApiResponse } from '../types/rickAndMorty.ts';

export async function fetchAll(
  name: string,
  page: number = 1
): Promise<ApiResponse> {
  const url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new FetchError('Could not fetch character');
  }
  return response.json();
}

export async function getCharacterById(id: string | number) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  if (!response.ok) {
    throw new FetchError('Could not fetch character by ID');
  }
  return response.json();
}
