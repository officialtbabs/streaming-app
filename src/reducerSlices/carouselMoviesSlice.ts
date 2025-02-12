import {createSlice} from '@reduxjs/toolkit';
import {Movie} from '../constants/types/types';

interface CarouselState {
  list: Movie[] | null;
  currentCarouselIndex: number;
  autoPlay: boolean;
}

const initialState: CarouselState = {
  list: null,
  currentCarouselIndex: 0,
  autoPlay: true,
};

const carouselMoviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    updateCurrentCarouselIndex: (state, action) => {
      state.currentCarouselIndex = action.payload;
    },

    updateAutoPlay: (state, action) => {
      state.autoPlay = action.payload;
    },

    setCarouselMovies: (state, action) => {
      state.list = action.payload;
    },

    updateCarouselMoviesState: (state, action) => {
      const {currentCarouselIndex, updateAllExceptCurrent, ...changes} =
        action.payload;

      if (!state.list) {
        state.list = [];
      }

      if (updateAllExceptCurrent) {
        state.list = state.list.map((movie, i) =>
          i === currentCarouselIndex ? movie : {...movie, ...changes},
        );
      } else {
        if (state.list[currentCarouselIndex]) {
          state.list[currentCarouselIndex] = {
            ...state.list[currentCarouselIndex],
            ...changes,
          };
        }
      }

      state.currentCarouselIndex = currentCarouselIndex;
    },
    resetCarouselMoviesState: state => {
      if (!state.list) {
        state.list = [];
      }

      state.list = state.list.map(movie => ({
        ...movie,
        isPaused: true,
        showPoster: true,
        seekTime: 0,
      }));
      state.currentCarouselIndex = 0;
    },
  },
});

export const {
  updateCurrentCarouselIndex,
  updateAutoPlay,
  setCarouselMovies,
  updateCarouselMoviesState,
  resetCarouselMoviesState,
} = carouselMoviesSlice.actions;
export default carouselMoviesSlice.reducer;
