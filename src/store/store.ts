import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineSlices, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import globalStylesSlice from '../reducerSlices/globalStylesSlice';
import statusBarSlice from '../reducerSlices/statusBarSlice';
import moviesSlice from '../reducerSlices/moviesSlice';
import carouselMoviesSlice from '../reducerSlices/carouselMoviesSlice';

const mainPersistConfig = {
  key: 'mainPersist',
  storage: AsyncStorage,
  blacklist: ['modal'],
};

const reducers = combineSlices({
  globalStyles: globalStylesSlice,
  statusBar: statusBarSlice,
  movies: moviesSlice,
  carouselMovies: carouselMoviesSlice,
});

const persistedReducer = persistReducer(mainPersistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: defaultMiddleWare =>
    defaultMiddleWare({
      serializableCheck: false,
    }).concat(),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
