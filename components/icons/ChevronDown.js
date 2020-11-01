import React from 'react';
import Svg, { Path } from 'react-native-svg';

function ChevronDown(props) {
   return (
      <Svg width={14} height={8} viewBox="0 0 14 8" fill="none" {...props}>
         <Path
            d="M1 1l6 6 6-6"
            stroke="#444"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </Svg>
   );
}

export default ChevronDown;
