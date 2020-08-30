import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function RadioIcon({ selected }) {
   return (
      <Svg width={24} height={24} viewBox="0 0 24 24">
         <G data-name="Layer 2">
            <G data-name="radio-button-on">
               <Path
                  d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"
                  fill={selected? "#000": "#333"}
                  fillOpacity={0.8}
               />
               {selected && (
                  <Path d="M10 5a5 5 0 100 10 5 5 0 000-10z" fill="#000" fillOpacity={0.8} />
               )}
            </G>
         </G>
      </Svg>
   );
}
