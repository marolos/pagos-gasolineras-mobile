import React from 'react';
import Svg, { Path } from 'react-native-svg';

function ArrowLeftDownIcon(props) {
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
         <Path d="M17 7L7 17M17 17H7V7" />
      </Svg>
   );
}

export default ArrowLeftDownIcon;
