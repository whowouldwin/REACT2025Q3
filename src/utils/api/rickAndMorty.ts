import { ApiResponse, Character } from '../types/rickAndMorty';

export async function fetchData({name, page }:{name: string, page: number}) {
 const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}&page=${page}`);
 return await response.json() as ApiResponse;
}

export async function fetchCharacter({id}:{id: string}) {
 const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
 return await response.json() as Character;
}

