import React from 'react';
import { View, TextInput } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';

export default function BasicInput({ placeholder, onChangeText, validate }) {
  const [hasErrors, setHasError] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        style={[
          tailwind('bg-gray-200 rounded-md w-64 my-2 mx-3 pl-5'),
          editing ? tailwind('bg-white border border-black') : tailwind('bg-gray-200'),
          hasErrors ? tailwind('bg-white border border-red-400') : {},
          typefaces.pm,
        ]}
        onChangeText={(text) => {
          onChangeText(text);
          if (validate) {
            setHasError(!validate(text));
            setEditing(false);
          }
        }}
        onFocus={(e) => setEditing(true)}
      />
    </View>
  );
}
