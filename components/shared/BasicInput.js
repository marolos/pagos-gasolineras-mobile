import React from 'react';
import { View, TextInput } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';

export default function BasicInput({
	placeholder,
	onChange,
	validate,
	editable = true,
	defaultValue,
	style,
	maxLength = 100,
	keyboardType = 'default',
	multiline = false,
}) {
	const [hasErrors, setHasError] = React.useState(false);
	const [editing, setEditing] = React.useState(false);
	return (
		<View>
			<TextInput
				value={defaultValue}
				editable={editable}
				placeholder={placeholder}
				keyboardType={keyboardType}
				maxLength={maxLength}
				style={[
					styles.input,
					typefaces.pm,
					style ? style : {},
					editing ? styles.editing : styles.noEditing,
					hasErrors ? styles.hasErrors : {},
				]}
				onChangeText={(text) => {
					if (text.length > maxLength) return;
					if (validate) setHasError(!validate(text));
					if (onChange) onChange(text);
				}}
				onFocus={(e) => setEditing(true)}
				onEndEditing={(e) => {
					setEditing(false);
				}}
				multiline={multiline}
			/>
		</View>
	);
}

const styles = {
	input: tailwind('rounded-3xl border border-black w-64 pl-5 bg-white'),
	editing: tailwind('bg-white border border-black'),
	noEditing: tailwind('bg-white'),
	hasErrors: tailwind('bg-white border-2 border-red-400'),
};
