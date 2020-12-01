import React from 'react';
import { connect } from 'react-redux';
import { getMessaging } from './firebaseConfig';
import NotificationModal from './NotificationModal';

class BackgroundModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			item: null,
		};
	}

	componentDidMount() {
		getMessaging().onMessage((message) => {
			this.props.dispatch({ type: 'ARRIVED_NEW' });
			this.show(message);
		});
	}

	show = (message) => {
		const { data, notification, sentTime } = message;
		this.setState({
			item: { data, ...notification, created_at: new Date(sentTime).toISOString() },
			visible: true,
		});
	};

	close = () => {
		this.setState({ visible: false });
	};

	render() {
		const { visible, item } = this.state;
		return (
			<React.Fragment>
				{item && (
					<NotificationModal visible={visible} selectedItem={item} onClose={this.close} />
				)}
			</React.Fragment>
		);
	}
}

// <ReactNativeModal
// 	isVisible={visible}
// 	testID={'modal'}
// 	animationIn="fadeIn"
// 	animationOut="fadeOut"
// 	onSwipeComplete={this.close}
// 	backdropTransitionOutTiming={0}
// 	backdropOpacity={0.5}
// 	style={styles.modal}
// >
// 	{visible && item && (
// 		<View style={styles.view}>
// 			<View style={tailwind('flex flex-row mt-2')}>
// 				<View style={tailwind('mr-4')}>{getIcon(item.data.type)}</View>
// 				<View>
// 					<Text style={[tailwind('text-sm'), typefaces.pm]}>{item.title}</Text>
// 					<Text>{formatISODate(item.created_at, 'PPP')}</Text>
// 				</View>
// 			</View>
// 			<View style={tailwind('my-4 px-2')}>{getDetail(item.data.type, item)}</View>
// 			<View style={tailwind('flex items-center mb-2')}>
// 				<Button onPress={this.close} text="cerrar" />
// 			</View>
// 		</View>
// 	)}
// </ReactNativeModal>

export default connect()(BackgroundModal);
