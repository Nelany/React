import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './toastSlice';
import { rtkApi } from '../api/rtkApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import ifReturnToRickNMortyReducer from './ifReturnToRickNMortySlice';
import isCharLoading from './charactersLoadingSlice';
import charactersResponseReducer from './charactersResponseSlice';
import selectedCharactersReducer from './selectedCharactersSlice';


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
