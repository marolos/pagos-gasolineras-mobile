import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import Ripple from 'react-native-material-ripple';

export default function LoadingButton({ text, onPress, icon, loading, iconPos, style, textStyle = {} }) {
   return (
      <Ripple
         onPress={onPress}
			style={[tailwind('rounded-md items-center w-56'), style ? style : {}]}
			rippleColor="#ffffff"
			rippleSize={500}
			rippleDuration={600}
      >
         <View
            style={[
               tailwind('bg-black rounded-md items-center w-full py-4'),
               icon ? tailwind('flex flex-row justify-evenly') : {},
            ]}
         >
            {loading ? (
               <ActivityIndicator animating={loading} size="small" color="#ffffff" />
            ) : (
               <>
                  {icon && iconPos === 'left' && <View>{icon}</View>}
                  <Text style={[tailwind('text-white'), typefaces.psb, textStyle]}>{text}</Text>
                  {icon && iconPos === 'right' && <View>{icon}</View>}
               </>
            )}
         </View>
      </Ripple>
   );
}
