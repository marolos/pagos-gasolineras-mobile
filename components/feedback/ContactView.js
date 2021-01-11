import React from 'react';
import { ScrollView, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import { useObjState } from '../utils/hooks';

export default function ContactView({ navigation }) {
	const [state, setState] = useObjState({});
	return (
		<ScrollView keyboardShouldPersistTaps="handled" style={tailwind('p-6')}>
			<Text>zxcvzxcv</Text>
		</ScrollView>
	);
}
