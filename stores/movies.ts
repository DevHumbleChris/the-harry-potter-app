import { createSlice } from "@reduxjs/toolkit";
import { MoviesState, MoviesActionState, CharactersActionState } from "./types";

const initialState: MoviesState = {
  potterMovies: [],
  characters: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getHarryPotterMovies: (state, { payload }: MoviesActionState): void => {
      state.potterMovies = payload;
    },
    setHarryPotterCharacters: (
      state,
      { payload }: CharactersActionState
    ): void => {
      state.characters = payload
    },
  },
});

export const { getHarryPotterMovies, setHarryPotterCharacters } =
  moviesSlice.actions;
export default moviesSlice.reducer;
