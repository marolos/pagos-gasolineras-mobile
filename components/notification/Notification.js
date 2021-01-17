import React, { memo } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import tailwind from 'tailwind-rn';
import AdsIcon from '../icons/AdsIcon';
import BookIcon from '../icons/BookIcon';
import PoliticIcon from '../icons/PoliticIcon';
import TransferIcon from '../icons/TransferIcon';
import { FULL_WIDTH, NotificationType } from '../utils/constants';
import { formatISODate } from '../utils/dateUtils';
import { typefaces, shadowStyle3 } from '../utils/styles';

function Notification({ item, onSelect }) {
	return (
		<TouchableHighlight onPress={() => onSelect(item)} delayPressIn={0} underlayColor="#eee">
			<View style={[styles.touchable, shadowStyle3]}>
				<View style={styles.iconView}>{getIcon(item.data.type)}</View>
				<View>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.date}>{formatISODate(item.created_at)}</Text>
					<Text style={styles.body}>{item.body}</Text>
				</View>
			</View>
		</TouchableHighlight>
	);
}

export function getIcon(type) {
	switch (type) {
		case NotificationType.ADVERTISEMENT:
			return (
				<View style={styles.ads}>
					<AdsIcon />
				</View>
			);
		case NotificationType.TIP:
			return (
				<View style={styles.tip}>
					<AdsIcon stroke="#ec4899"/>
				</View>
			);
		case NotificationType.CHANGE_PRIVACY_POLICES:
			return (
				<View style={styles.changePolicy}>
					<PoliticIcon stroke="#f87171" width={18} />
				</View>
			);
		case NotificationType.TRANSFER:
			return (
				<View style={styles.transfer}>
					<TransferIcon width={18} stroke="#3b82f6" />
				</View>
			);
		case NotificationType.PURCHASE_DONE:
			return (
				<View style={styles.purchase}>
					<BookIcon width={18} stroke="#6366f1" />
				</View>
			);
	}
}

const styles = {
	touchable: tailwind('flex flex-row rounded-xl bg-white border border-gray-300 px-4 py-3'),
	iconView: tailwind('mr-4'),
	title: [tailwind('text-sm'), typefaces.pm, { width: FULL_WIDTH - 100 }],
	date: [tailwind('text-xs text-gray-700')],
	body: [{ fontSize: 13 }, typefaces.pr, { width: FULL_WIDTH - 80 }],
	changePolicy: tailwind('w-8 h-8 rounded-full bg-red-100 flex items-center justify-center'),
	transfer: tailwind('w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center'),
	purchase: tailwind('w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center'),
	ads: tailwind('w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center'),
	tip: tailwind('w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center'),
};

export default memo(Notification);
