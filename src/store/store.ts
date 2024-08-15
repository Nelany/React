import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import countries from './CountriesSlice';
import uncontrolledFormData from './UncontrolledFormSlice';
import uncontrolledImg from './UncontrolledImgSlice';

export const store = configureStore({
  reducer: {
    uncontrolledFormData,
    countries,
    uncontrolledImg,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
