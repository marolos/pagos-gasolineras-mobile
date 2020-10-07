import React from 'react';
import Svg, { Path } from 'react-native-svg';

function HamburguerIcon({ color = '#000000' }) {
   return (
      <Svg
         width={24}
         height={24}
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

export default HamburguerIcon;
