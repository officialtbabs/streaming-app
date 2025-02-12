import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface StatusBarState {
  iosStatusBarHeight: number;
  androidStatusBarHeight: number;
}

const initialState: StatusBarState = {
  iosStatusBarHeight: 0,
  androidStatusBarHeight: 0,
};

const statusBarSlice = createSlice({
  name: 'statusBar',
  initialState,
  reducers: {
    setIosStatusBarHeight(state, action: PayloadAction<number>) {
      state.iosStatusBarHeight = action.payload;
    },
    setAndroidStatusBarHeight(state, action: PayloadAction<number>) {
      state.androidStatusBarHeight = action.payload;
    },
  },
});

export const {setIosStatusBarHeight, setAndroidStatusBarHeight} =
  statusBarSlice.actions;
export default statusBarSlice.reducer;
