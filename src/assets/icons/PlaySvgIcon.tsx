import React from 'react';
import Svg, {Path} from 'react-native-svg';

const PlaySvgIcon = ({color}: {color: string}) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.6758 10.6926C20.6953 11.2661 20.6953 12.7339 19.6758 13.3074L8.23539 19.7426C7.23549 20.305 6 19.5825 6 18.4352L6 5.56477C6 4.41753 7.23549 3.69496 8.23539 4.25741L19.6758 10.6926Z"
        fill={color}
      />
    </Svg>
  );
};

export default PlaySvgIcon;
