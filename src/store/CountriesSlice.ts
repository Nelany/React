import { createSlice } from '@reduxjs/toolkit';

const initialState = ['Switzerland', 'China', 'USA', 'UK', 'UAE'];

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
