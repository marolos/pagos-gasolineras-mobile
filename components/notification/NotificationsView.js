import React, { memo } from 'react';
import { View, FlatList, ActivityIndicator, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { setActiveTab } from '../redux/actions';
import { TabOptions } from '../redux/reducers';
import Line from '../shared/Line';
import Notification from './Notification';
import emptyImage from '../../assets/background/empty.png';
import { typefaces } from '../utils/styles';
import { makeCancelable } from '../utils/utils';
import Fetch from '../utils/Fetch';

class NotificationsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			loadingMore: false,
		};
	}
	componentDidMount() {
		const { navigation, dispatch } = this.props;
		this.unsubscribeFocus = navigation.addListener('focus', () => {
			dispatch(setActiveTab(TabOptions.NOTIFICATIONS));
		});
		this.loadNew();
	}

	componentWillUnmount() {
		if (this.unsubscribeFocus) this.unsubscribeFocus();
	}

	onEndReached = () => {
		this.setState({ loadingMore: true });
		setTimeout(() => this.setState({ loadingMore: false }), 1500);
	};

	keyExtractor = (item) => item.id + '';

	loadNew = () => {
		if (this.state.refreshing) return;
		this.setState({ refreshing: true });
		Fetch.get('/notification/')
			.then((res) => {
				this.props.dispatch({ type: 'SET_NOTIFICATION', value: res.body.notifications });
			})
			.catch((err) => console.error(err))
			.finally(() => this.setState({ refreshing: false }));
	};

	render() {
		const { refreshing, loadingMore } = this.state;
		return (
			<FlatList
				ListEmptyComponent={EmptyMessage}
				refreshing={refreshing}
				onRefresh={this.loadNew}
				data={this.props.notifications}
				renderItem={Notification}
				keyExtractor={this.keyExtractor}
				ItemSeparatorComponent={Line}
				ListFooterComponent={<ListFooter loading={loadingMore} />}
				onEndReached={this.onEndReached}
				onEndReachedThreshold={0.3}
			/>
		);
	}
}

const ListFooter = memo(({ loading }) => {
	return (
		<View style={tailwind('p-6')}>
			<ActivityIndicator color="black" animating={loading} />
		</View>
	);
});

const EmptyMessage = memo((props) => {
	return (
		<View style={tailwind('items-center mb-12 mt-24')}>
			<View>
				<Image source={emptyImage} style={tailwind('w-32 h-48')} />
			</View>
			<View style={tailwind('px-12')}>
				<Text style={[tailwind('text-gray-600 text-center mt-4'), typefaces.pm]}>
					No tienes notificaciones
				</Text>
			</View>
		</View>
	);
});

export default connect(({ notifications }) => ({ notifications }))(NotificationsView);
