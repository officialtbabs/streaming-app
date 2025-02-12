import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import createGlobalStyles from '../globalStyles/globalStyles';

interface GlobalStyleState {
  styles: ReturnType<typeof createGlobalStyles>;
}

const initialState: GlobalStyleState = {
  styles: createGlobalStyles(0), // Initialize with default value
};

const globalStyleSlice = createSlice({
  name: 'globalStyle',
  initialState,
  reducers: {
    setGlobalStyle(state, action: PayloadAction<number>) {
      state.styles = createGlobalStyles(action.payload);
    },
  },
});

export const {setGlobalStyle} = globalStyleSlice.actions;
export default globalStyleSlice.reducer;
