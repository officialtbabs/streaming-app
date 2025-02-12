import React, {FC} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import TextComponent from '../text/TextComponent';
import {useAppSelector} from '../../constants/utils/hooks';
import LinearGradient from 'react-native-linear-gradient';

export interface CategoryCardProps {
  title: string;
  wrappeStyles?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  colorStops: {start: string; stop: string};
}

const CategoryCard: FC<CategoryCardProps> = ({
  title,
  wrappeStyles,
  titleStyle,
  colorStops: {start, stop},
}) => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);

  return (
    <LinearGradient
      style={[
        globalStyles.h20,
        globalStyles.w36p5,
        globalStyles.roundedLg,
        globalStyles.p3,
        globalStyles.justifyEnd,
        wrappeStyles,
      ]}
      colors={[start, stop]}
      locations={[0.3, 1]}
      useAngle
      angle={135}
      angleCenter={{x: 0.5, y: 0.5}}>
      <TextComponent style={titleStyle}>{title}</TextComponent>
    </LinearGradient>
  );
};

export default CategoryCard;
