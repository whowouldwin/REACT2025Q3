export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
}

export interface ApiResponse {
  info: {
    pages: number;
  };
  results: Character[];
}
