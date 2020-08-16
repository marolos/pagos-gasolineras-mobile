import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import CloseIcon from '../icons/CloseIcon';

export default function VehicleIdItem({ number, alias='', onDelete }) {
  return (
    <View style={tailwind('bg-gray-300 rounded m-1 py-1 px-2 flex flex-row')}>
      <View style={tailwind('flex flex-row justify-center')}>
        <Text style={tailwind('text-gray-800')}>{number}</Text>
        {alias.length > 0 && (
          <>
            <Text>{' - '}</Text>
            <Text>{alias}</Text>
          </>
        )}
      </View>
      <TouchableOpacity
        style={tailwind('flex flex-col justify-center ml-2')}
        onPress={onDelete}
      >
        <View style={tailwind('py-2 px-1')}>
          <CloseIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
}
