import React from 'react';
import TextComponent from '../text/TextComponent';
import Box from '../box/Box';
import {useAppSelector} from '../../constants/utils/hooks';

const ChipComponent = ({text}: {text: string}) => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);
  return (
    <Box
      style={[
        globalStyles.px2,
        globalStyles.py1,
        globalStyles.borderWhiteOpacity30,
        globalStyles.roundedLg,
      ]}>
      <TextComponent
        style={[
          globalStyles.textWhiteOpacity60,
          globalStyles.textSm,
          globalStyles.leading4p5,
          globalStyles.textCapitalise,
          globalStyles.textCenter,
        ]}>
        {text}
      </TextComponent>
    </Box>
  );
};

export default ChipComponent;
