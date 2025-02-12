import {createSlice} from '@reduxjs/toolkit';
import {Movie} from '../constants/types/types';

interface MoviesState {
  list: Movie[] | null;
  currentIndex: number;
}

const initialState: MoviesState = {
  list: null,
  currentIndex: 0,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    updateCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },

    setMovies: (state, action) => {
      state.list = action.payload;
    },

    updateMoviesState: (state, action) => {
      const {currentIndex, updateAllExceptCurrent, ...changes} = action.payload;

      if (!state.list) {
        state.list = [];
      }

      if (updateAllExceptCurrent) {
        state.list = state.list.map((movie, i) =>
          i === currentIndex ? movie : {...movie, ...changes},
        );
      } else {
        if (state.list[currentIndex]) {
          state.list[currentIndex] = {
            ...state.list[currentIndex],
            ...changes,
          };
        }
      }

      state.currentIndex = currentIndex;
    },
    resetMoviesState: state => {
      if (!state.list) {
        state.list = [];
      }

      state.list = state.list.map(movie => ({
        ...movie,
        isPaused: true,
        showPoster: true,
        seekTime: 0,
      }));
      state.currentIndex = 0;
    },
  },
});

export const {
  updateCurrentIndex,
  setMovies,
  updateMoviesState,
  resetMoviesState,
} = moviesSlice.actions;
export default moviesSlice.reducer;
