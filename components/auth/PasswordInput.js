import React from 'react';
import { View, TextInput } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';

export default function PasswordInput({ placeholder, onChange, validate, style }) {
   const [hasErrors, setHasError] = React.useState(false);
   const [editing, setEditing] = React.useState(false);
   return (
      <View>
         <TextInput
            placeholder={placeholder}
            style={[
               tailwind('rounded-md border-2 border-gray-200 w-64 pl-5'),
               editing
                  ? tailwind('bg-white border-2 border-gray-600')
                  : tailwind('bg-gray-200'),
               hasErrors ? tailwind('bg-white border-2 border-red-400') : {},
					typefaces.pm,
					style ? style : {},
            ]}
            onChangeText={(text) => {
               if (validate) {
                  setHasError(!validate(text));
					}
					onChange(text)
            }}
            onFocus={(e) => setEditing(true)}
            onEndEditing={(e) => {
               setEditing(false);
            }}
            secureTextEntry={true}
         />
      </View>
   );
}
