import React from 'react';
import { typefaces } from '../../utils/styles';
import tailwind from 'tailwind-rn';
import { Text } from 'react-native';

export default function Label({ focused, text, style }) {
  return focused ? (
    <Text style={[tailwind('text-black text-xs'), style || {}, typefaces.pm]}>{text}</Text>
  ) : null;
}
