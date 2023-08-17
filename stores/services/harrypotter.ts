// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type MovieName = string 

// Define a service using a base URL and expected endpoints
export const potterMoviesAPI = createApi({
  reducerPath: 'potterMoviesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_MOVIE_SEARCH_BASEURL }),
  endpoints: (builder) => ({
    getHarryPotterMovies: builder.query<MovieName, string>({
      query: (name) => `?query=${name}&include_adult=false&language=en-US&page=1`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetHarryPotterMoviesQuery } = potterMoviesAPI