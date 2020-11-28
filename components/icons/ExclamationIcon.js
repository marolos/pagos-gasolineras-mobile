import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function ExclamationIcon(props){
   return (
      <Svg width="14" height="14" viewBox="0 0 65 65" fill="none">
         <Path
            d="M32.5 0C14.625 0 0 14.625 0 32.5C0 50.375 14.625 65 32.5 65C50.375 65 65 50.375 65 32.5C65 14.625 50.375 0 32.5 0ZM32.5 6.5C36.075 6.5 38.675 9.425 38.35 13L35.75 39H29.25L26.65 13C26.325 9.425 28.925 6.5 32.5 6.5ZM32.5 58.5C28.925 58.5 26 55.575 26 52C26 48.425 28.925 45.5 32.5 45.5C36.075 45.5 39 48.425 39 52C39 55.575 36.075 58.5 32.5 58.5Z"
            fill="red" />
      </Svg>
   );
}


export default memo(ExclamationIcon);
