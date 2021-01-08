import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import Ripple from 'react-native-material-ripple';
import { btn_primary, btn_secundary, btn_text } from '../utils/colors'

export default function AppButton({ text, onPress, primary = true, style = {}, textStyle = {}, viewStyle = {} }) {
   return (
      <Ripple
         onPress={onPress}
         style={[styles.ripple, style]}
         rippleColor={primary ? btn_primary : btn_secundary}
      >
         <View style={[styles.view, primary ? { backgroundColor: btn_primary } : { backgroundColor: btn_secundary }, viewStyle]}>
            <Text
               style={[
                  typefaces.psb,
                  primary ? { color: btn_text } : styles.textNoPrimary,
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
   ripple: tailwind('w-40'),
   view: tailwind('flex flex-row justify-center rounded-3xl items-center py-3 w-full'),
   viewPrimary: tailwind('bg-black'),
   viewNoPrimary: tailwind('bg-white border-black'),
   textPrimary: tailwind('text-white'),
   textNoPrimary: tailwind('text-white'),
};
