import { FetchError } from '../error/FetchError.ts';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: number;
  image: string;
  gender: string;
}

export interface ApiResponse {
  info: {
    pages: number;
  };
  results: Character[];
}

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
