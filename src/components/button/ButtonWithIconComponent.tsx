import {
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import React, {FC, ReactNode} from 'react';
import TextComponent from '../text/TextComponent';
import {useAppSelector} from '../../constants/utils/hooks';
import Box from '../box/Box';

interface buttonProps extends TouchableOpacityProps {
  title: string;
  icon: ReactNode;
  onPress: () => void;
  wrapperStyles?: StyleProp<ViewStyle>;
  textSyles?: StyleProp<TextStyle>;
}

const ButtonWithIconComponent: FC<buttonProps> = ({
  title,
  icon,
  onPress,
  wrapperStyles,
  textSyles,
  ...rest
}) => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);

  return (
    <Box style={wrapperStyles}>
      <Pressable
        activeOpacity={0.5}
        onPress={onPress}
        {...rest}
        style={[
          globalStyles.flex,
          globalStyles.flexRow,
          globalStyles.justifyCenter,
          globalStyles.itemsCenter,
          globalStyles.gapX1,
        ]}>
        <Box style={[globalStyles.flexRow, globalStyles.itemsCenter]}>
          {icon}
        </Box>

        <TextComponent style={textSyles}>{title}</TextComponent>
      </Pressable>
    </Box>
  );
};

export default ButtonWithIconComponent;
