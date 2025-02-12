import React, {useEffect} from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import Box from './src/components/box/Box';
import MainNavigation from './src/navigations/mainNavigation/mainNavigation';
import {
  useAppDispatch,
  useAppSelector,
  useStatusBarHeight,
} from './src/constants/utils/hooks';
import {setGlobalStyle} from './src/reducerSlices/globalStylesSlice';
import {Keyboard} from 'react-native';
import {runOnJS} from 'react-native-reanimated';

const links = {
  prefixes: ['myvideostreamingapp://'],
};
const Wrapper = () => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);
  const dispatch = useAppDispatch();
  // const {darkMode} = useAppSelector(state => state.darkMode);

  const dismissKeyboard = () => Keyboard.dismiss(); // Native function

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(dismissKeyboard)(); // Ensure it's executed in JS, avoiding the Reanimated error
  });

  const {statusBarHeight, setStatusBarHeight} = useStatusBarHeight();

  useEffect(() => {
    setStatusBarHeight();
  }, [setStatusBarHeight]);

  useEffect(() => {
    statusBarHeight && dispatch(setGlobalStyle(statusBarHeight));
  }, [dispatch, statusBarHeight]);

  return (
    <>
      {/* <ThemeProvider theme={darkMode ? theme.darkTheme : theme.lightTheme}> */}
      <GestureHandlerRootView style={[globalStyles.flex]}>
        <GestureDetector gesture={tapGesture}>
          <Box style={[globalStyles.flex]}>
            <NavigationContainer
              // onReady={() => {
              //   setTimeout(() => {
              //     BootSplash.hide({fade: true});
              //   }, 1000);
              // }}
              linking={links}>
              {/* <ToastComponent /> */}
              <MainNavigation />
              {/* <MagicModalPortal /> */}
            </NavigationContainer>
          </Box>
        </GestureDetector>
      </GestureHandlerRootView>
      {/* </ThemeProvider> */}
    </>
  );
};

export default Wrapper;
