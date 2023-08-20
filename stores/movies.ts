import { createSlice } from "@reduxjs/toolkit";
import { MoviesState, MoviesActionState, CharactersActionState, CharacterSelected, KnowForActionState } from "./types";

const initialState: MoviesState = {
  potterMovies: [],
  students: [],
  staffs: [],
  selectedPerson: null,
  selectedKnownForData: null
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
    setSelectedStaff: (state, { payload }: CharacterSelected): void => {
      state.selectedPerson = payload
    },
    setSelectedKnownForData: (state, { payload }: KnowForActionState): void => {
      state.selectedKnownForData = payload
    }
  },
});

export const {
  getHarryPotterMovies,
  setHarryPotterStudentsCharacters,
  setHarryPotterStaffsCharacters,
  setSelectedStaff,
  setSelectedKnownForData
} = moviesSlice.actions;
export default moviesSlice.reducer;
