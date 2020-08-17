import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';

export default function LoadingButton({ text, onPress, icon, loading, iconPos, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[tailwind('rounded-md items-center w-56'), style ? style : {}]}
      delayPressIn={0}
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
            <Text style={[tailwind('text-white'), typefaces.psb]}>{text}</Text>
            {icon && iconPos === 'right' && <View>{icon}</View>}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
