import React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function PasswordLoginIcon(props) {
  return (
    <Svg width={26} height={27} viewBox="0 0 26 27" fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)" fill="#919191" stroke="#919191" strokeWidth={0.5}>
        <Path d="M19.712 9.837h-.424V6.75A6.295 6.295 0 0013 .462a6.295 6.295 0 00-6.288 6.287v3.088h-.424a2.243 2.243 0 00-2.24 2.24v12.144a2.243 2.243 0 002.24 2.24h13.424a2.243 2.243 0 002.24-2.24V12.077a2.243 2.243 0 00-2.24-2.24zM8.632 6.75A4.373 4.373 0 0113 2.382a4.373 4.373 0 014.368 4.367v3.088H8.632V6.75zm11.4 17.472c0 .174-.147.32-.32.32H6.288a.324.324 0 01-.32-.32V12.077c0-.173.147-.32.32-.32H19.712c.173 0 .32.147.32.32v12.144z" />
        <Path d="M13 15.351a.96.96 0 00-.96.96v3.676a.96.96 0 101.92 0v-3.676a.96.96 0 00-.96-.96z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" transform="translate(0 .462)" d="M0 0h26v26H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default PasswordLoginIcon;
