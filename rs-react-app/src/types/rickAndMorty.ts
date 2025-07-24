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
