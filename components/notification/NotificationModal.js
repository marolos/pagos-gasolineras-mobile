import React, { memo } from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import ReactNativeModal from 'react-native-modal';
import { getIcon } from './Notification';
import { FULL_WIDTH, NotificationType } from '../utils/constants';
import { typefaces } from '../utils/styles';
import {
	AdsDetail,
	DisableUserDetail,
	PolicyDetail,
	PurchaseDetail,
	TipDetail,
	TransferDetail,
} from './Details';
import Button from '../shared/Button';
import { formatISODate } from '../utils/dateUtils';

class NotificationModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { onClose, visible, selectedItem } = this.props;
		const { type } = selectedItem.data;

		return (
			<ReactNativeModal
				isVisible={visible}
				testID={'modal'}
				animationIn="fadeIn"
				animationOut="fadeOut"
				onSwipeComplete={onClose}
				backdropTransitionOutTiming={0}
				backdropOpacity={0.5}
				style={styles.modal}
			>
				<View style={styles.view}>
					<View style={tailwind('flex flex-row mt-2')}>
						<View style={tailwind('mr-4')}>{getIcon(type)}</View>
						<View>
							<Text style={[tailwind('text-sm'), typefaces.pm]}>{selectedItem.title}</Text>
							<Text>{formatISODate(selectedItem.created_at, 'PPP')}</Text>
						</View>
					</View>
					<View style={tailwind('my-4 px-2')}>{getDetail(type, selectedItem, onClose)}</View>
					<View style={tailwind('flex items-center mb-2')}>
						{type === NotificationType.PURCHASE_DONE ? (
							<></>
						) : (
							<Button onPress={onClose} text="cerrar" />
						)}
					</View>
				</View>
			</ReactNativeModal>
		);
	}
}

export function getDetail(type, item, onClose) {
	switch (type) {
		case NotificationType.CHANGE_PRIVACY_POLICES:
			return <PolicyDetail {...item} />;
		case NotificationType.PURCHASE_DONE:
			return <PurchaseDetail {...item} onClose={onClose}/>;
		case NotificationType.TIP:
			return <TipDetail {...item} />;
		case NotificationType.ADVERTISEMENT:
			return <AdsDetail {...item} />;
		case NotificationType.DISABLE_USER:
			return <DisableUserDetail {...item} />;
		case NotificationType.TRANSFER:
			return <TransferDetail {...item} />;
	}
}

const styles = {
	modal: [tailwind('rounded'), { hight: 500 }],
	view: [tailwind('p-4 flex bg-white rounded-lg'), { width: FULL_WIDTH - 40 }],
	close: tailwind('mt-4 p-6'),
};

export default memo(NotificationModal);
