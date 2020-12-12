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
					styles.input,
					typefaces.pm,
					editing ? styles.editing : styles.noEditing,
					hasErrors ? styles.error : {},
					style ? style : {},
				]}
				onChangeText={(text) => {
					if (validate) {
						setHasError(!validate(text));
					}
					onChange(text);
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

const styles = {
	input: tailwind('rounded-md border-2 border-gray-200 w-64 pl-5'),
	editing: tailwind('bg-white border-2 border-gray-600'),
	noEditing: tailwind('bg-gray-200'),
	error: tailwind('bg-white border-2 border-red-400'),
};
