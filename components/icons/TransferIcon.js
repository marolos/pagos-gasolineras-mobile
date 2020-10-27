import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function TransferIcon(props) {
   return (
      <Svg width={22} height={18} viewBox="0 0 22 18" fill="none" {...props}>
         <Path
            d="M19.462 12.795H1.512M5.103 16.385l-3.59-3.59 3.59-3.59M1.513 5.103H19.46M16.898 1.513l3.59 3.59-3.59 3.59"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </Svg>
   );
}

export default memo(TransferIcon);
