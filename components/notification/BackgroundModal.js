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

export default connect()(BackgroundModal);
