import React, { memo } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { View } from 'react-native';

function NotificationIcon({ focused }) {
   return (
      <View>
         <Svg width={25} height={25} viewBox="0 0 30 30" fill="none">
            <G opacity={focused ? 1 : 0.4} fill="#000">
               <Path d="M25.15 21.293l-2.662-3.767v-7.359c0-3.756-2.78-6.875-6.39-7.407V1.098a1.098 1.098 0 00-2.195 0V2.76c-3.61.532-6.39 3.65-6.39 7.407v7.359L4.85 21.293a1.098 1.098 0 00.896 1.73h18.508c.89 0 1.409-1.005.896-1.73zm-17.284-.464l1.64-2.32c.131-.186.201-.407.201-.634v-7.708A5.299 5.299 0 0115 4.874a5.299 5.299 0 015.293 5.293v7.708c0 .227.07.448.201.633l1.64 2.32H7.866zM15 23.807a3.1 3.1 0 00-3.096 3.097A3.1 3.1 0 0015 30a3.1 3.1 0 003.096-3.096A3.1 3.1 0 0015 23.807zm0 3.998a.902.902 0 010-1.802.902.902 0 010 1.802z" />
            </G>
         </Svg>
      </View>
   );
}

export default memo(NotificationIcon);
