import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import Ripple from 'react-native-material-ripple';
export default function Button({ text, onPress, primary = true, style = {}, textStyle = {} }) {
   return (
      <Ripple
         onPress={onPress}
         style={[styles.ripple, style]}
         rippleColor={primary ? 'white' : 'black'}
      >
         <View style={[styles.view, primary ? styles.viewPrimary : styles.viewNoPrimary]}>
            <Text
               style={[
                  typefaces.pm,
                  primary ? styles.textPrimary : styles.textNoPrimary,
                  textStyle,
               ]}
            >
               {text}
            </Text>
         </View>
      </Ripple>
   );
}

const styles = {
   ripple: tailwind('w-32'),
   view: tailwind('border rounded-md items-center w-full py-2'),
   viewPrimary: tailwind('bg-black'),
   viewNoPrimary: tailwind('bg-white border-black'),
   textPrimary: tailwind('text-white'),
   textNoPrimary: tailwind('text-black'),
};
