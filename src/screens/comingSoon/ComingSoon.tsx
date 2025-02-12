import React from 'react';
// import ComingSoonIcon from '../../assets/svgs/illustrations/comingSoon.svg';
// import Box from '../../components/layout/Box';
import TextComponent from '../../components/text/TextComponent';
import {useTailwind} from 'tailwind-rn'; // Import useTailwind
import Box from '../../components/box/Box';
import {useAppSelector} from '../../constants/utils/hooks';

const ComingSoon = () => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);

  return (
    <Box style={[globalStyles.flex, globalStyles.px6]}>
      {/* <HeaderComponent title="" /> */}
      <Box
        style={[
          globalStyles.flex,
          globalStyles.justifyCenter,
          globalStyles.itemsCenter,
        ]}>
        {/* <ComingSoonIcon /> */}
        <TextComponent
          style={[
            globalStyles.text2xl,
            globalStyles.fontBold,
            globalStyles.pt6,
          ]}>
          Coming Soon
        </TextComponent>

        <TextComponent style={[globalStyles.fontNormal, globalStyles.pt3]}>
          You'll be updated once the feature is live!
        </TextComponent>
      </Box>
    </Box>
  );
};

export default ComingSoon;
