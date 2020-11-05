import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';

export default function TextButton({ text, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={tailwind('rounded-md items-center')}
    >
      <View style={tailwind('bg-white rounded-md items-center w-full py-2')}>
        <Text style={[tailwind('text-black'), typefaces.psb, style || {}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
