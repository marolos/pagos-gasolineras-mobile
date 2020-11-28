import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';

const style = StyleSheet.create({
	circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ACACAC',
		alignItems: 'center',
		justifyContent: 'center',
	},
	checked: { height: 12, width: 12, borderRadius: 7, backgroundColor: '#000000' },
});

export default function RadioButton({ item, active, onCheck }) {
	return (
		<View>
			<TouchableOpacity activeOpacity={0.8} onPress={() => onCheck(item.value)}>
				<View style={tailwind('flex flex-row mx-2')}>
					<Text>
						{item.label} {''}
					</Text>
					<View style={style.circle}>
						{active ? <View style={style.checked} /> : <View />}
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
}
