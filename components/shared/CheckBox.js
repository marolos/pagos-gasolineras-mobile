import React from 'react';
import Ripple from 'react-native-material-ripple';
import Svg, { Path } from 'react-native-svg';

export default function CheckBox({ onChange, defaultValue }) {
   const [selected, setSelected] = React.useState(false);
   React.useEffect(() => {
      if (defaultValue) setSelected(defaultValue);
   }, []);
   React.useEffect(() => {
      onChange(selected);
   }, [selected]);
   return (
      <Ripple onPress={() => setSelected(!selected)} rippleSize={50} rippleCentered>
         <Svg width={25} height={25} viewBox="0 0 20 20" fill="none">
            <Path
               d="M16.84 0H3.16A3.164 3.164 0 000 3.16v13.68A3.164 3.164 0 003.16 20h13.68A3.164 3.164 0 0020 16.84V3.16A3.164 3.164 0 0016.84 0zm1.053 16.84c0 .58-.472 1.053-1.053 1.053H3.16c-.58 0-1.053-.472-1.053-1.053V3.16c0-.58.472-1.053 1.053-1.053h13.68c.58 0 1.053.472 1.053 1.053v13.68z"
               fill="#000"
               fillOpacity={selected ? 0.8 : 0.6}
            />
            {selected && (
               <Path
                  d="M13.88 5.921c-.34 0-.659.133-.9.373l-4.706 4.714L7.02 9.754c-.24-.24-.56-.372-.9-.372-.34 0-.659.132-.899.372s-.372.56-.372.9c0 .339.132.658.372.898l2.154 2.154c.24.24.56.373.9.373.339 0 .658-.133.899-.373l5.605-5.614a1.273 1.273 0 00-.899-2.17z"
                  fill="#000"
                  fillOpacity={0.8}
               />
            )}
         </Svg>
      </Ripple>
   );
}
