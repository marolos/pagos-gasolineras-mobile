import React, { memo } from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import Ripple from 'react-native-material-ripple';
import ReactNativeModal from 'react-native-modal';
import { getIcon } from './Notification';
import { FULL_WIDTH, NotificationType } from '../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { formatISODate } from '../buy/utils';
import { typefaces } from '../utils/styles';
import CloseIcon from '../icons/CloseIcon';

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
					<Ripple style={styles.arrow} onPress={onClose} rippleCentered>
						<CloseIcon width={15} height={15}/>
					</Ripple>
					<View style={tailwind('flex flex-row mt-6')}>
						<View style={tailwind('mr-4')}>{getIcon(type)}</View>
						<View>
							<Text style={[tailwind('text-sm'), typefaces.pm]}>{selectedItem.title}</Text>
							<Text>{formatISODate(selectedItem.created_at, 'PPP')}</Text>
						</View>
					</View>
					<View style={tailwind('my-4')}>{getDetail(type, selectedItem)}</View>
				</View>
			</ReactNativeModal>
		);
	}
}

const PolicyDetail = memo(({ data }) => (
	<ScrollView style={[{ minHeight: 300, marginHorizontal: 16 }]}>
		<Text>{data.polices}</Text>
	</ScrollView>
));

const PurchaseDetail = memo(({ data, body }) => (
	<View>
		<Text>{body}</Text>
		<View style={tailwind('mt-4')}>
			<Text style={[typefaces.pm]}>
				Amount: <Text style={[tailwind('text-green-600')]}>${data.amount}</Text>
			</Text>
			<Text style={[typefaces.pm]}>
				Gasolinera: <Text>{data.gas_station}</Text>
			</Text>
			<Text style={[typefaces.pm]}>
				Combustible: <Text>{data.fueltype}</Text>
			</Text>
		</View>
	</View>
));

const TipDetail = memo(({ data }) => <View></View>);

const AdsDetail = memo(({ data }) => <View></View>);

const DisableUserDetail = memo(({ data }) => <View></View>);

const TransferDetail = memo(({ data }) => <View></View>);

function getDetail(type, item) {
	switch (type) {
		case NotificationType.CHANGE_PRIVACY_POLICES:
			return <PolicyDetail {...item} />;
		case NotificationType.PURCHASE_DONE:
			return <PurchaseDetail {...item} />;
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
	modal: tailwind('items-center rounded'),
	view: [tailwind('p-4 bg-white rounded-lg'), { width: FULL_WIDTH - 40 }],
	arrow: tailwind('absolute right-0 p-6'),
};

export default memo(NotificationModal);
