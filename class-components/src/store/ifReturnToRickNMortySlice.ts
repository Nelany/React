import { createSlice } from '@reduxjs/toolkit';

interface IfReturnToRickNMortyState {
  value: boolean;
}

const initialState: IfReturnToRickNMortyState = {
  value: false,
};

export const ifReturnToRickNMortySlice = createSlice({
  name: 'ifReturnToRickNMorty',
  initialState,
  reducers: {
    toggleIfReturnToRickNMorty: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleIfReturnToRickNMorty } =
  ifReturnToRickNMortySlice.actions;

export default ifReturnToRickNMortySlice.reducer;