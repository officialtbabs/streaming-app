import React, {FC} from 'react';
import {Image, ImageStyle, StyleProp, TextStyle, ViewStyle} from 'react-native';
import Box from '../box/Box';
import TextComponent from '../text/TextComponent';
import {Movie} from '../../constants/types/types';
import {useAppSelector} from '../../constants/utils/hooks';

interface MovieCardProps extends Movie {
  showGenre?: boolean;
  imageWidth: number;
  imageHeight: number;
  imageStyles?: StyleProp<ImageStyle>;
  wrappeStyles?: StyleProp<ViewStyle>;
  genreStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const MovieCard: FC<MovieCardProps> = ({
  title,
  genres,
  cover,
  showGenre,
  imageWidth = 0,
  imageHeight = 0,
  imageStyles,
  wrappeStyles,
  genreStyle,
  titleStyle,
}) => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);

  return (
    <Box style={wrappeStyles}>
      <Image
        source={cover}
        style={imageStyles}
        width={imageWidth}
        height={imageHeight}
        resizeMode="cover"
      />

      <Box style={[showGenre && globalStyles.gapY1]}>
        {showGenre && (
          <Box style={[globalStyles.flexRow, globalStyles.gapX2]}>
            {genres?.map((genre, index) => (
              <TextComponent key={index} style={genreStyle}>
                {genre}
              </TextComponent>
            ))}
          </Box>
        )}

        <TextComponent style={titleStyle}>{title}</TextComponent>
      </Box>
    </Box>
  );
};

export default MovieCard;
