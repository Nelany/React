import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  'Belarus', 'Switzerland', 'China', 'USA', 'UK', 'UAE', 'Canada', 'Germany', 'France', 'Italy', 'Spain',
  'Australia', 'Japan', 'South Korea', 'India', 'Brazil', 'Mexico', 'Ukraine', 'Russia', 'South Africa',
  'Argentina', 'Chile', 'Colombia', 'Peru', 'Venezuela', 'Egypt', 'Nigeria', 'Kenya', 'Turkey',
  'Saudi Arabia', 'Israel', 'Indonesia', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines',
  'Singapore', 'New Zealand', 'Greece', 'Portugal', 'Netherlands', 'Belgium', 'Sweden', 'Norway',
  'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Austria', 'Ireland', 'Iceland'
];

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
