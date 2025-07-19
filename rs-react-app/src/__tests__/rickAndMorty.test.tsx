import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fetchAll, type ApiResponse, type Character } from '../api/rickAndMorty.ts';
import { FetchError } from '../error/FetchError.ts';

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 1,
    image: 'https://ex.com/${id}.png',
    gender: 'Male',
  },
  {
    id: 2,
    name: 'Morty',
    status: 'Alive',
    species: 1,
    image: 'https://ex.com/${id}.png',
    gender: 'Male',
  },
];

const mockApiResponse: ApiResponse = {
  info: {
    pages: 42,
  },
  results: mockCharacters,
};

const server = setupServer(
  http.get('https://rickandmortyapi.com/api/character/', ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    const page = url.searchParams.get('page');

    if (name === 'Rick' && page === '1') {
      return HttpResponse.json(mockApiResponse);
    }

    if (name === 'MissingCharacter') {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(mockApiResponse);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('fetchAll', () => {
  it('fetch successfully', async () => {
    const response = await fetchAll('Rick', 1);
    expect(response).toEqual(mockApiResponse);
  });

  it('fetch unsuccessfully (404 and FetchError)', async () => {
    await expect(fetchAll('MissingCharacter')).rejects.toThrow(FetchError);
    await expect(fetchAll('MissingCharacter')).rejects.toThrow(
      'Could not fetch character'
    );
  });
});
