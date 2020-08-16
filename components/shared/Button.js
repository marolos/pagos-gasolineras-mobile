import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
export default function Button({ text, onPress, primary = true, style = {}, textStyle = {} }) {
  return (
    <TouchableOpacity
      delayPressIn={50}
      onPress={onPress}
      activeOpacity={0.85}
      style={[tailwind('w-32'), style]}
    >
      <View
        style={
          primary
            ? tailwind('bg-black rounded-md border items-center w-full py-2')
            : tailwind('bg-white rounded-md border border-black items-center w-full py-2')
        }
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
    </TouchableOpacity>
  );
}
