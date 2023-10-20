import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = appSlice.actions;

export default appSlice.reducer;
