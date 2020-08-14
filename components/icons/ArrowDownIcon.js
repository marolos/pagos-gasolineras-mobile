import React from 'react';
import Svg, { Path } from 'react-native-svg';

function ArrowDownIcon(props) {
  return (
    <Svg width={25} height={14} viewBox="0 0 30 18" fill="none" {...props}>
      <Path
        d="M15 17.55a2.095 2.095 0 01-1.485-.615l-12.9-12.9a2.1 2.1 0 112.971-2.97L15 12.479 26.413 1.065a2.1 2.1 0 012.971 2.971l-12.899 12.9c-.41.41-.948.614-1.485.614z"
        fill="#000"
      />
    </Svg>
  );
}

export default ArrowDownIcon;
