import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function HamburguerIcon({ color = '#ffffff' }) {
   return (
      <Svg
         width={28}
         height={28}
         viewBox="0 0 24 24"
         stroke={color}
         strokeWidth={3}
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <Path d="M3 12h18M3 6h18M3 18h18" />
      </Svg>
   );
}

export default memo(HamburguerIcon);
