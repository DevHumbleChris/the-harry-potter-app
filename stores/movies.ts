import { createSlice } from "@reduxjs/toolkit";
import { MoviesState, ActionState } from './types'

const initialState: MoviesState = {
  potterMovies: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getHarryPotterMovies: (state, { payload } : ActionState ): void => {
      state.potterMovies = payload
    },
  },
});

export const { getHarryPotterMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
