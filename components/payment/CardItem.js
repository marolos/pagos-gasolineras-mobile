import React from 'react';
import { View, Text, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import visaLogo from '../../assets/images/visa.png';
import mastercardLogo from '../../assets/images/mastercard.png';
import amexLogo from '../../assets/images/amex.png';
import dinersLogo from '../../assets/images/diners.png';
import discoverLogo from '../../assets/images/discover.png';
import maestroLogo from '../../assets/images/maestro.png';
import { shadowStyle3, typefaces } from '../utils/styles';
import RadioIcon from '../icons/RadioIcon';

export default function CardItem({ holderName, type, onPress, selected }) {
	return (
		<Ripple
			rippleColor="#718096"
			onPress={onPress}
			style={[styles.ripple, selected ? styles.selected : styles.selected]}
		>
			<View style={tailwind( 'rounded-xl flex flex-row justify-between px-6 py-5')}>
				<View style={styles.view}>
					<Image source={getCardLogo(type)} style={styles.image} />
					<Text style={styles.text}>{holderName}</Text>
				</View>
				<View style={styles.iconView}>
					<RadioIcon selected={selected} />
				</View>
			</View>
		</Ripple>
	);
}

export function getCardLogo(type) {
	switch (type.toLowerCase()) {
		case 'vi':
			return visaLogo;
		case 'mc':
			return mastercardLogo;
		case 'ax':
			return amexLogo;
		case 'di':
			return dinersLogo;
		case 'dc':
			return discoverLogo;
		case 'ms':
			return maestroLogo;
		default:
			return visaLogo;
	}
}

const styles = {
	ripple: [tailwind('mb-2 bg-white rounded-xl border border-gray-300'), shadowStyle3],
	selected: tailwind('border-gray-400'),
	noSelected: tailwind('border-gray-200'),
	view: tailwind('flex flex-row items-center'),
	image: { width: 30, resizeMode: 'contain' },
	text: [tailwind('ml-3 mt-1'), typefaces.psb, tailwind('text-base')],
	iconView: tailwind('mr-1 mt-1 items-center'),
};
