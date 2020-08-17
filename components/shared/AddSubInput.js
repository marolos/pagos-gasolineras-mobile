import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import AddIcon from '../icons/AddIcon';
import SubstractIcon from '../icons/SubstractIcon';
import { ADD_VALUE_STEP } from '../../utils/constants';

export default function AddSubInput({ onChange }) {
  const [state, setState] = React.useState({
    count: 50.0,
    text: '20.00',
    hasError: false,
  });

  function handleChange(text) {
    const value = parseFloat(text);
    if (value) {
      setState((state) => ({ count: text.replace(/[\-\,\s]/, ''), hasError: false }));
    } else {
      setState((state) => ({ count: text.replace(/[\-\,\s]/, ''), hasError: true }));
    }
  }

  function add() {
    setState((state) => ({ ...state, count: state.count + ADD_VALUE_STEP }));
  }

  function sub() {
    setState((state) => {
      const newValue = state.count - ADD_VALUE_STEP;
      return { ...state, count: newValue >= 0 ? newValue : 0.0 };
    });
  }

  return (
    <View style={tailwind('flex flex-row justify-evenly items-center')}>
      <TouchableOpacity delayPressIn={0} activeOpacity={0.5} onPress={sub}>
        <View>
          <SubstractIcon />
        </View>
      </TouchableOpacity>
      <View
        style={[
          tailwind('border-2 border-gray-600 rounded w-32 h-12 flex flex-row items-center'),
          state.hasError ? tailwind('border-red-400'): {},
        ]}
      >
        <Text style={[tailwind('text-gray-600 ml-4'), typefaces.pm]}>$</Text>
        <TextInput
          value={state.count ? state.count.toString() : ''}
          defaultValue={'100.00'}
          style={[tailwind('text-gray-900 w-20')]}
          placeholder="10.00"
          keyboardType="numeric"
          onChangeText={handleChange}
        />
      </View>
      <TouchableOpacity delayPressIn={0} activeOpacity={0.5} onPress={add}>
        <View>
          <AddIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
}
