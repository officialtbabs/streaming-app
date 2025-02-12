import React from 'react';
import SearchIcon from '../../assets/icons/search.svg';
import Box from '../box/Box';
import {useAppSelector} from '../../constants/utils/hooks';

const HeaderComponent = () => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);

  return (
    <Box
      style={[
        globalStyles.h12,
        globalStyles.flexRow,
        globalStyles.justifyBetween,
        globalStyles.itemsCenter,
        globalStyles.px5,
      ]}>
      <SearchIcon />
    </Box>
  );
};

export default HeaderComponent;
