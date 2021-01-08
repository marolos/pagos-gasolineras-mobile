import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import Line from '../shared/Line';

const TYPES = [
	{ name: 'suggestion', label: 'Sugerencias', id: '0' },
	{ name: 'bug', label: 'Bug', id: '1' },
	{ name: 'fraud', label: 'Fraude', id: '2' },
	{ name: 'abuse', label: 'Abuso', id: '3' },
	{ name: 'other', label: 'Otro', id: '4' },
];

export default function FeedbackType({ navigation }) {
	return (
		<FlatList
			data={TYPES}
			renderItem={({ item }) => (
				<TypeItem
					label={item.label}
					onSelect={() =>
						navigation.navigate('feedbackView', { type: item })
					}
				/>
			)}
			ItemSeparatorComponent={Line}
			keyExtractor={(e) => e.id}
		/>
	);
}

function TypeItem({ label, onSelect }) {
	return (
		<Ripple style={tailwind('px-6 py-4')} onPress={onSelect}>
			<Text>{label}</Text>
		</Ripple>
	);
}
