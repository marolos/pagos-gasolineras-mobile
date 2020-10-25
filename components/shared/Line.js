import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';

export default function Line({ style = styles.line }) {
   return <View style={[{ height: 1 }, style]}></View>;
}

const styles = {
   line: tailwind('w-full bg-gray-300'),
};
