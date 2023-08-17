import { potterMoviesAPI } from './services/harrypotter'
import { setupListeners } from '@reduxjs/toolkit/query'
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [potterMoviesAPI.reducerPath]: potterMoviesAPI.reducer,
      },
      // Adding the api middleware enables caching, invalidation, polling,
      // and other useful features of `rtk-query`.
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(potterMoviesAPI.middleware),
})

// Infering the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)