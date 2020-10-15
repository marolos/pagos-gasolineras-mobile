import React, { memo } from 'react';
import Svg, { G, Path } from 'react-native-svg';

function BackIcon(props) {
   return (
      <Svg width={30} height={30} viewBox="0 0 25 25" fill="none" {...props}>
         <G>
            <Path
               d="M26.307 11.808H4.365l5.955-5.955a.691.691 0 000-.981.691.691 0 00-.98 0l-7.136 7.136a.691.691 0 000 .98l7.136 7.136a.698.698 0 00.488.206.676.676 0 00.487-.206.691.691 0 000-.98L4.36 13.189h21.947a.69.69 0 100-1.381z"
               fill="#000"
            />
         </G>
      </Svg>
   );
}

export default memo(BackIcon);
