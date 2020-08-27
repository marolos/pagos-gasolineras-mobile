import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import Ripple from 'react-native-material-ripple';
export default function Button({ text, onPress, primary = true, style = {}, textStyle = {} }) {
   return (
      <Ripple
         onPress={onPress}
         style={[tailwind('w-32'), style]}
         rippleColor={primary ? 'white' : 'black'}
      >
         <View
            style={[
               tailwind('border rounded-md items-center w-full py-2'),
               primary ? tailwind('bg-black') : tailwind('bg-white border-black'),
            ]}
         >
            <Text
               style={[
                  typefaces.pm,
                  primary ? tailwind('text-white') : tailwind('text-black'),
                  textStyle,
               ]}
            >
               {text}
            </Text>
         </View>
      </Ripple>
   );
}
