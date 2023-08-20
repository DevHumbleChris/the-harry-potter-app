import { createSlice } from "@reduxjs/toolkit";
import { MoviesState, MoviesActionState, CharactersActionState } from "./types";

const initialState: MoviesState = {
  potterMovies: [],
  students: [],
  staffs: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getHarryPotterMovies: (state, { payload }: MoviesActionState): void => {
      state.potterMovies = payload;
    },
    setHarryPotterStudentsCharacters: (
      state,
      { payload }: CharactersActionState
    ): void => {
      state.students = payload;
    },
    setHarryPotterStaffsCharacters: (
      state,
      { payload }: CharactersActionState
    ): void => {
      state.staffs = payload;
    },
  },
});

export const {
  getHarryPotterMovies,
  setHarryPotterStudentsCharacters,
  setHarryPotterStaffsCharacters,
} = moviesSlice.actions;
export default moviesSlice.reducer;
