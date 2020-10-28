import React, { memo } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

function CardIcon(props) {
   return (
      <Svg
         width={22}
         height={22}
         viewBox="0 0 24 24"
         fill="none"
         stroke="#000"
         strokeWidth={1.6}
         strokeLinecap="round"
         strokeLinejoin="round"
         {...props}
      >
         <Rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
         <Path d="M1 10h22" />
      </Svg>
   );
}

export default memo(CardIcon);
