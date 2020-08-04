import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';

export default function LoadingButton({ text, onPress, icon, loading }) {
  return (
    <TouchableOpacity
			onPress={onPress}
			activeOpacity={0.9}
      style={tailwind('rounded-md items-center w-56')}
    >
      <View style={tailwind('bg-black rounded-md items-center w-full py-4')}>
        {loading ? (
          <ActivityIndicator animating={loading} size="small" color="#ffffff" />
        ) : (
          <>
            {icon && <View>{icon}</View>}
            <Text style={[tailwind('text-white'), typefaces.psb]}>{text}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

