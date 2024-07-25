import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import characterReducer from './characterSlice';
import ifReturnToRickNMortyReducer from './ifReturnToRickNMortySlice';
import { rtkApi } from '../api/rtkApi';
import toastReducer from './toastSlice';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
    ifReturnToRickNMorty: ifReturnToRickNMortyReducer,
    characters: characterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
