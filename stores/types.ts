export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Wand {
  wood: string;
  core: string;
  length: number;
}
export interface Characters {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: Wand;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: string;
}

export interface MoviesState {
  potterMovies: Movie[];
  students: Characters[];
  staffs: Characters[];
}

export interface CharactersActionState {
  type: string;
  payload: Characters[];
}

export interface MoviesActionState {
  type: string;
  payload: Movie[];
}

export interface ResponseState {
  error: string | Object | null;
  data: null | Movie[];
}

export interface CharactersResponseState {
  error: string | Object | null;
  data: null | Characters[];
}
