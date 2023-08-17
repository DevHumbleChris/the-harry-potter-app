import { createSlice } from "@reduxjs/toolkit";

interface MoviesState {
    movies: object[]
}

const initialState : MoviesState = {
    movies: []
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        getMovies: (state) => {
            state.movies = [{ name: 'hello' }]
        }
    }
})

export default moviesSlice.reducer