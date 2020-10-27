import React, { memo } from 'react';
import Svg, { Path, G } from 'react-native-svg';

function ProfileIcon({ width = 17, height = 25, fill = '#000' }) {
   return (
      <Svg width={width} height={height} viewBox="0 0 17 25" fill="none">
         <G opacity={0.9} fill={fill}>
            <Path d="M10.981 11.752H6.476c-5.677 0-6.262 8.35-5.736 8.884 1.417 1.324 4.497 2.249 8.035 2.249 3.539 0 6.45-.883 7.773-2.122.534-.45.102-9.011-5.567-9.011zm4.328 7.772c-1.06.976-3.623 1.587-6.534 1.587-2.91 0-5.473-.62-6.533-1.587-.085-.263.407-6.092 4.327-6.092h4.506c3.878-.008 4.327 5.82 4.234 6.092zM8.69 11.217c2.648 0 4.863-2.121 4.77-4.769A4.751 4.751 0 008.69 1.68a4.751 4.751 0 00-4.768 4.768 4.746 4.746 0 004.769 4.77zm0-7.772c1.766 0 3.09 1.323 3.09 3.003 0 1.68-1.418 3.004-3.09 3.004-1.671 0-3.097-1.324-3.097-3.004s1.418-3.003 3.098-3.003z" />
         </G>
      </Svg>
   );
}

export default memo(ProfileIcon);