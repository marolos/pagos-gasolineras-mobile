import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function ArrowUpLeftIcon(props) {
   return (
      <Svg width={12} height={12} viewBox="0 0 12 12" fill="none" {...props}>
         <Path
            d="M11 11L1 1M1 11V1h10"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </Svg>
   );
}

export default memo(ArrowUpLeftIcon);
