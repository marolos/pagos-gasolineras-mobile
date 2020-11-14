import React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function NavigationIcon({ width = 14, height = 14, stroke = '#333' }) {
   return (
      <Svg width={width} height={height} viewBox="0 0 14 14">
         <G clipPath="url(#prefix__clip0)">
            <Path
               d="M.667 6.667l12.666-6-6 12.666L6 8 .667 6.667z"
               stroke={stroke}
               strokeWidth={1.5}
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </G>
         <Defs>
            <ClipPath id="prefix__clip0">
               <Path fill={stroke} d="M0 0h14v14H0z" />
            </ClipPath>
         </Defs>
      </Svg>
   );
}

export default NavigationIcon;
