import React from 'react';
import { View, TextInput } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';

export default function BasicInput({
   placeholder,
   onEndEditing,
   onChange,
   validate,
   editable = true,
   defaultValue,
   style,
	maxLength,
	keyboardType='default'
}) {
   const [hasErrors, setHasError] = React.useState(false);
   const [editing, setEditing] = React.useState(false);
   const max = maxLength ? maxLength : 100;
   return (
      <View>
         <TextInput
            value={defaultValue}
            editable={editable}
				placeholder={placeholder}
				keyboardType={keyboardType}
            maxLength={max}
            style={[
               tailwind('rounded-md border-2 border-gray-200 w-64 pl-5'),
               style ? style : {},
               editing ? tailwind('bg-white border-2 border-gray-600') : tailwind('bg-gray-200'),
               hasErrors ? tailwind('bg-white border-2 border-red-400') : {},
               typefaces.pm,
            ]}
            onChangeText={(text) => {
               if (text.length > max) return;
               if (validate) setHasError(!validate(text));
               if (onChange) onChange(text);
            }}
            onFocus={(e) => setEditing(true)}
            onEndEditing={(e) => {
               setEditing(false);
            }}
         />
      </View>
   );
}
