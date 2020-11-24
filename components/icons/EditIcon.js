import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function EditIcon(props) {
   return (
      <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
         <Path
            d="M8.273 3.182H3.182a1.455 1.455 0 00-1.455 1.454v10.182a1.454 1.454 0 001.455 1.455h10.182a1.455 1.455 0 001.454-1.455v-5.09"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <Path
            d="M13.727 2.09a1.543 1.543 0 112.182 2.183L9 11.182l-2.91.727L6.819 9l6.91-6.91z"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </Svg>
   );
}

export default memo(EditIcon);
