import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function CardIcon(props) {
   return (
      <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
         <Path
            d="M18 6H2a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zm1 11c0 .551-.449 1-1 1H2c-.551 0-1-.449-1-1V8c0-.551.449-1 1-1h16c.551 0 1 .449 1 1v9zM15.314 2.155a2 2 0 00-2.658-.967L4.48 5h2.366l6.232-2.906a1.001 1.001 0 011.329.484L15.538 5h1.103l-1.327-2.845z"
            fill="#000"
            fillOpacity={0.5}
         />
         <Path
            d="M6 8H3a1 1 0 00-1 1v2a1 1 0 001 1h3a1 1 0 001-1V9a1 1 0 00-1-1zm0 3H3V9h3v2zM12 15H2v1h10v-1zM16.5 14c-.386 0-.734.15-1 .39a1.49 1.49 0 00-1-.39 1.5 1.5 0 000 3c.386 0 .734-.15 1-.39.266.24.614.39 1 .39a1.5 1.5 0 000-3zm-2 2a.5.5 0 11.001-1.001A.5.5 0 0114.5 16zm2 0a.5.5 0 11.001-1.001A.5.5 0 0116.5 16z"
            fill="#000"
            fillOpacity={0.5}
         />
      </Svg>
   );
}

export default memo(CardIcon);
