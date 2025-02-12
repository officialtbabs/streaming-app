import React from 'react';
import Box from '../box/Box';
import {useAppSelector} from '../../constants/utils/hooks';
import TextComponent from '../text/TextComponent';
import ChevronRightSvgIcon from '../../assets/icons/ChevronRightSvgIcon';
import pallete from '../../constants/colors/pallete';

const SectionHeaderComponent = ({title}: {title: string}) => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);

  return (
    <Box
      style={[
        globalStyles.h6p25,
        globalStyles.flexRow,
        globalStyles.justifyBetween,
        globalStyles.itemsCenter,
      ]}>
      <TextComponent
        style={[
          globalStyles.textWhite,
          globalStyles.textXl,
          globalStyles.fontSemiBold,
          globalStyles.leading6,
        ]}>
        {title}
      </TextComponent>

      <ChevronRightSvgIcon color={pallete.white} />
    </Box>
  );
};

export default SectionHeaderComponent;
