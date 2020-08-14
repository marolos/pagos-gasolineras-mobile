import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';

export default function Line({ style }) {
  return <View style={[{height: 1}, style ]}></View>;
}
