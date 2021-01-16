import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces, shadowStyle3 } from '../utils/styles';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image';
import { info_text, dollar_text } from '../utils/colors';

function BalanceCard({ total, company, gasStation, onPress }) {
	return (
		<Ripple onPress={onPress} style={[styles.ripple, shadowStyle3]} rippleDuration={270}>
			<View style={styles.view}>
				<FastImage source={{ uri: company.company_logo_path }} style={styles.image} />
				<View>
					<Text style={styles.name}>{gasStation.name}</Text>
					<View style={tailwind('flex flex-row')}>
						<Text style={styles.totalText}>Saldo:</Text>
						<Text style={total > 5 ? styles.total1 : styles.total0}>${total}</Text>
					</View>
				</View>
			</View>
		</Ripple>
	);
}

const styles = {
	ripple: tailwind('mb-2 bg-white rounded-xl border border-gray-300'),
	view: tailwind('flex flex-row rounded-xl py-2 px-3 items-center'),
	image: { width: 65, height: 65, marginRight: 15 },
	line: tailwind('bg-gray-300 w-full mt-2 mb-1'),
	name: [tailwind('text-black text-base'), typefaces.psb],
	totalText: [tailwind('text-sm mr-1'), typefaces.pm, { color: info_text }],
	total0:  [tailwind('text-sm'), typefaces.psb, { color: info_text }],
	total1: [tailwind('text-sm'), typefaces.psb, { color: dollar_text }],
};

export default BalanceCard;
