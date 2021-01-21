import React from 'react';
import { View, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import { FULL_HIGHT, FULL_WIDTH } from '../utils/constants';

import fondo from '../../assets/img/fondo.png';
import AdsPaginator from './AdsPaginator';
import CloseIcon from '../icons/CloseIcon';
import Ripple from 'react-native-material-ripple';

export default function AdsView({ navigation }) {
	function close() {
		navigation.goBack()
	}
	return (
		<View style={styles.view}>
			<Image source={fondo} style={styles.image} />
			<Ripple onPress={close} style={styles.ripple} rippleColor='white' rippleDuration={200} rippleCentered >
				<CloseIcon width={18} height={18} stroke="white" />
			</Ripple>
			<AdsPaginator />
		</View>
	);
}

const styles = {
	view: [tailwind('flex flex-col justify-center'), { height: FULL_HIGHT }],
	image: { position: 'absolute', top: 0, width: FULL_WIDTH, height: FULL_HIGHT + 30 },
	ripple: [
		tailwind(
			'absolute flex justify-center w-12 h-12 bg-gray-900 rounded-full items-center opacity-75',
		),
		{ zIndex: 10, right: 12, top: 16 },
	],
};
