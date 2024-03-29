import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import { FULL_HIGHT, FULL_WIDTH } from '../utils/constants';
import { typefaces } from '../utils/styles';
import Button from '../shared/Button';
import AppButton from '../shared/AppButton';

export default function LogoutView({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.bg} />
			<View style={tailwind('bg-white rounded-lg p-6 items-center w-4/5')}>
			<Text style={[tailwind('text-xl'), typefaces.psb]}>¿Cerrar sesión?</Text>
				<View style={tailwind('flex flex-row mt-4')}>
					<AppButton
						text="no"
						style={tailwind('w-2/5 mr-4')}
						primary={false}
						onPress={() => {
							navigation.navigate('home');
						}}
					/>
					<AppButton
						text="si"
						style={tailwind('w-2/5')}
						onPress={() => {
							navigation.navigate('loggingOut');
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = {
	container: [
		{
			margin: 0,
			height: FULL_HIGHT + 40,
			width: FULL_WIDTH + 5,
		},
		tailwind('flex items-center justify-center'),
	],
	bg: {
		position: 'absolute',
		backgroundColor: 'rgba(0,0,0,0.7)',
		top: 0,
		left: 0,
		margin: 0,
		height: FULL_HIGHT + 40,
		width: FULL_WIDTH,
	},
};
