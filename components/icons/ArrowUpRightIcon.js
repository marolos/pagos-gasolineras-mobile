import React from 'react';
import Svg, { Path } from 'react-native-svg';

function ArrowUpRightIcon(props) {
   return (
      <Svg
         width={20}
         height={20}
         viewBox="0 0 24 24"
         stroke="#000"
         strokeWidth={1.5}
         strokeLinecap="round"
         strokeLinejoin="round"
         {...props}
      >
         <Path d="M7 17L17 7M7 7h10v10" />
      </Svg>
   );
}

export default ArrowUpRightIcon;
