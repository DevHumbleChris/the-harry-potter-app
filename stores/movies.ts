import { createSlice } from "@reduxjs/toolkit";

interface MoviesState {
  potterMovies: object[];
}

interface ActionState { 
    type: string,
    payload: Array<Object>
}

const initialState: MoviesState = {
  potterMovies: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getHarryPotterMovies: (state, { payload } : ActionState ): void => {
        console.log(payload)
      state.potterMovies = payload
    },
  },
});

export const { getHarryPotterMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
