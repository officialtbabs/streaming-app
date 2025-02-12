import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {isIos} from './utils';
import {
  setAndroidStatusBarHeight,
  setIosStatusBarHeight,
} from '../../reducerSlices/statusBarSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useStatusBarHeight = () => {
  const dispatch = useAppDispatch();
  const safeAreaInsets = useSafeAreaInsets();

  const iosStatusBarHeight = useAppSelector(
    (state: RootState) => state.statusBar.iosStatusBarHeight,
  );

  const androidStatusBarHeight = StatusBar.currentHeight;

  const statusBarHeight = isIos() ? iosStatusBarHeight : androidStatusBarHeight;

  const setStatusBarHeight = () => {
    isIos()
      ? dispatch(setIosStatusBarHeight(safeAreaInsets.top))
      : dispatch(setAndroidStatusBarHeight(StatusBar.currentHeight || 0));
  };

  return {
    statusBarHeight,
    setStatusBarHeight,
  };
};
