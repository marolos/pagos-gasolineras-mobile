import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import { formatISODate } from '../buy/utils';
import AdsIcon from '../icons/AdsIcon';
import BookIcon from '../icons/BookIcon';
import PoliticIcon from '../icons/PoliticIcon';
import TransferIcon from '../icons/TransferIcon';
import { FULL_WIDTH, NotificationType } from '../utils/constants';
import { typefaces } from '../utils/styles';

function Notification({ item, onSelect }) {
	return (
		<Ripple style={styles.ripple} rippleSize={FULL_WIDTH} onPress={() => onSelect(item)}>
			<View style={styles.iconView}>{getIcon(item.data.type)}</View>
			<View>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.date}>{formatISODate(item.created_at)}</Text>
				<Text style={styles.body}>{item.body}</Text>
			</View>
		</Ripple>
	);
}

export function getIcon(type) {
	switch (type) {
		case NotificationType.ADVERTISEMENT:
			return <AdsIcon />;
		case NotificationType.CHANGE_PRIVACY_POLICES:
			return <PoliticIcon />;
		case NotificationType.TRANSFER:
			return <TransferIcon />;
		case NotificationType.PURCHASE_DONE:
			return <BookIcon />;
	}
}

const styles = {
	ripple: tailwind('flex flex-row px-4 py-3'),
	iconView: tailwind('mr-4'),
	title: [tailwind('text-sm'), typefaces.pm],
	date: [tailwind('text-xs text-gray-700')],
	body: [tailwind('text-sm'), typefaces.pr],
};

export default memo(Notification);
