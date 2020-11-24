import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';

export default function Line({ style = {} }) {
   return <View style={[styles, style]} />;
}

const styles = {
   height: 1,
   ...tailwind('w-full bg-gray-300'),
};
