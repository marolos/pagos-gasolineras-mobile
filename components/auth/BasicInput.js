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
          tailwind('rounded-md border-2 border-gray-200 w-64 my-2 mx-3 pl-5'),
          editing ? tailwind('bg-white border-2 border-gray-600') : tailwind('bg-gray-200'),
          hasErrors ? tailwind('bg-white border-2 border-red-400') : {},
          typefaces.pm,
        ]}
        onChangeText={(text) => {
          if (validate) {
            setHasError(!validate(text))
          }
        }}
        onFocus={(e) => setEditing(true)}
        onEndEditing={(e) => {
          onChangeText(e.nativeEvent.text)
          setEditing(false);
        }}
      />
    </View>
  );
}
