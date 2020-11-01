import React from 'react';
import Svg, { Path } from 'react-native-svg';

function QRIcon(props) {
   return (
      <Svg width={16} height={16} viewBox="0 0 22 22" {...props}>
         <Path
            d="M15.335 12v3.333h3.332v3.332l3.333.001V22h-3.333v-3.332h-3.332v3.332H12v-3.333h3.333v-3.333H12V12h3.334zM7.5 12a2.5 2.5 0 012.5 2.5v5A2.5 2.5 0 017.5 22h-5A2.5 2.5 0 010 19.5v-5A2.5 2.5 0 012.5 12h5zm0 2h-5a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5zm-.75 1.25v3.5h-3.5v-3.5h3.5zM22 12v3.333h-3.333V12H22zM7.5 0A2.5 2.5 0 0110 2.5v5A2.5 2.5 0 017.5 10h-5A2.5 2.5 0 010 7.5v-5A2.5 2.5 0 012.5 0h5zm12 0A2.5 2.5 0 0122 2.5v5a2.5 2.5 0 01-2.5 2.5h-5A2.5 2.5 0 0112 7.5v-5A2.5 2.5 0 0114.5 0h5zm-12 2h-5a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5zm12 0h-5a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5zm-.75 1.25v3.5h-3.5v-3.5h3.5zm-12.003.003v3.494H3.253V3.253h3.494z"
            fill="#fff"
         />
      </Svg>
   );
}

export default QRIcon;