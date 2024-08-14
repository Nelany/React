import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import uncontrolledFormData from './UncontrolledFormSlice';
import countries from './CountriesSlice';

export const store = configureStore({
  reducer: {
    uncontrolledFormData,
    countries,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
