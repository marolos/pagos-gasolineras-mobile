import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';
import AdsIcon from '../icons/AdsIcon';
import BookIcon from '../icons/BookIcon';
import PoliticIcon from '../icons/PoliticIcon';
import TransferIcon from '../icons/TransferIcon';
import { FULL_WIDTH, NotificationType } from '../utils/constants';

export default function Notification({ title }) {
	return (
		<Ripple style={styles.item} rippleSize={FULL_WIDTH} >
			<View>

			</View>
			<Text style={styles.title}>{title}</Text>
		</Ripple>
	);
}

function getIcon(type) {
	switch (type) {
		case NotificationType.ADVERTISEMENT:
			return <AdsIcon />
		case NotificationType.CHANGE_PRIVACY_POLICES:
			return <PoliticIcon />
		case NotificationType.TRANSFER:
			return <TransferIcon />
		case NotificationType.PURCHASE_DONE:
			return <BookIcon />
	}
}

const styles = StyleSheet.create({
	item: {
		padding: 20,
		backgroundColor: 'white'
	},
	title: {
		fontSize: 32,
	},
});
