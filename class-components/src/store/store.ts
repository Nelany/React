import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import isCharLoading from './charactersLoadingSlice';
import charactersResponseReducer from './charactersResponseSlice';
import ifReturnToRickNMortyReducer from './ifReturnToRickNMortySlice';
import selectedCharactersReducer from './selectedCharactersSlice';
import toastReducer from './toastSlice';
import { rtkApi } from '../api/rtkApi';


export const store = configureStore({
  reducer: {
    toast: toastReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
    ifReturnToRickNMorty: ifReturnToRickNMortyReducer,
    isCharLoading: isCharLoading,
    charactersResponse: charactersResponseReducer,
    selectedCharacters: selectedCharactersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
