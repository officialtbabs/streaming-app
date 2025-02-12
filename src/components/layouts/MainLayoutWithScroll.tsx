import React, {FC, ReactNode} from 'react';
import {KeyboardAvoidingView, StatusBar, ScrollView} from 'react-native';
import pallete from '../../constants/colors/pallete';
import {useAppSelector} from '../../constants/utils/hooks';
import {isIos} from '../../constants/utils/utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import Box from '../box/Box';

interface MainLayoutProps {
  children: ReactNode;
  transparent?: boolean;
  avoidKeyboard?: boolean;
  layoutHeader?: ReactNode;
}

const MainLayoutWithScroll: FC<MainLayoutProps> = ({
  children,
  avoidKeyboard = true,
  transparent = true,
  layoutHeader,
}) => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);

  return (
    <Box style={[globalStyles.flex, globalStyles.bgBlack]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        style={[
          globalStyles.flex,
          globalStyles.hScreen,
          transparent && globalStyles.bgTransparent,
        ]}>
        {avoidKeyboard ? (
          <KeyboardAvoidingView
            style={[
              globalStyles.flex,
              transparent && globalStyles.bgTransparent,
            ]}
            behavior={isIos() ? 'padding' : 'height'}>
            <Box
              style={[
                globalStyles.flex,
                transparent && globalStyles.bgTransparent,
              ]}>
              <>{children}</>
            </Box>
          </KeyboardAvoidingView>
        ) : (
          <Box style={[globalStyles.flex]}>
            <Box
              style={[
                globalStyles.flex,
                transparent && globalStyles.bgTransparent,
              ]}>
              <>{children}</>
            </Box>
          </Box>
        )}
      </ScrollView>

      <SafeAreaView style={[globalStyles.absolute, globalStyles.top0]}>
        <StatusBar translucent backgroundColor={pallete.transparent} />

        <Box style={[globalStyles.ptStatusBar]}>{layoutHeader}</Box>
      </SafeAreaView>
    </Box>
  );
};

export default MainLayoutWithScroll;
