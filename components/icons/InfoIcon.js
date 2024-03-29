import React, { memo } from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
function InfoIcon({ width, height, fill }) {
   return (
      <Svg width={width || 24} height={height || 24} viewBox="0 0 24 24" fill="none">
         <G clipPath="url(#prefix__clip0)" fill={fill || '#000'}>
            <Path d="M11.754.247C5.427.247.28 5.394.28 11.72c0 6.328 5.148 11.475 11.475 11.475 6.328 0 11.476-5.147 11.476-11.475C23.23 5.394 18.082.247 11.754.247zm0 20.863c-5.177 0-9.389-4.212-9.389-9.389 0-5.176 4.212-9.388 9.39-9.388 5.176 0 9.388 4.212 9.388 9.388 0 5.177-4.212 9.389-9.389 9.389z" />
            <Path d="M11.754 9.288c-.576 0-1.043.467-1.043 1.043v6.954a1.043 1.043 0 002.086 0V10.33c0-.576-.467-1.043-1.043-1.043zM11.754 5.115c-.275 0-.543.112-.738.306a1.051 1.051 0 00-.305.737c0 .275.111.544.305.738.194.194.463.306.738.306.275 0 .543-.112.738-.306.194-.194.305-.463.305-.738 0-.274-.111-.543-.305-.737a1.052 1.052 0 00-.738-.306z" />
         </G>
         <Defs>
            <ClipPath id="prefix__clip0">
               <Path fill="#fff" transform="translate(.279 .246)" d="M0 0h22.951v22.951H0z" />
            </ClipPath>
         </Defs>
      </Svg>
   );
}

export default memo(InfoIcon);
