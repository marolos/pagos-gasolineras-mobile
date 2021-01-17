import React, { memo } from 'react';
import { View, FlatList, ActivityIndicator, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { setActiveTab } from '../redux/ui/actions';
import Line from '../shared/Line';
import Notification from './Notification';
import emptyImage from '../../assets/background/empty.png';
import { typefaces } from '../utils/styles';
import Fetch from '../utils/Fetch';
import NotificationModal from './NotificationModal';
import { TabOptions } from '../redux/ui/reducers';
import fondo from '../../assets/img/fondo.png';
import { FULL_WIDTH, FULL_HIGHT } from '../utils/constants';
import { background, info_text } from '../utils/colors';

class NotificationsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			loadingMore: false,
			modalVisible: false,
			selectedItem: null,
		};
	}

	componentDidMount() {
		const { navigation, dispatch, route } = this.props;
		if (route.params) {
			const { data, notification, sentTime } = route.params;
			this.setState({
				selectedItem: { data, ...notification, created_at: new Date(sentTime).toISOString() },
				modalVisible: true,
			});
		}
		this.unsubscribeFocus = navigation.addListener('focus', () => {
			dispatch(setActiveTab(TabOptions.NOTIFICATIONS));
			dispatch({ type: 'CLEAR_ARRIVED_NEW' });
		});
		this.loadNew();
	}

	componentWillUnmount() {
		if (this.unsubscribeFocus) this.unsubscribeFocus();
	}

	loadNew = () => {
		if (this.state.refreshing) return;
		this.setState({ refreshing: true });
		Fetch.get('/notification/')
			.then((res) => {
				this.props.dispatch({ type: 'SET_NOTIFICATIONS', value: res.body.notifications });
			})
			.catch((err) => console.error(err))
			.finally(() => {
				this.setState({ refreshing: false });
				this.props.dispatch({ type: 'CLEAR_ARRIVED_NEW' });
			});
	};

	onEndReached = () => {
		if (this.state.loadingMore) return;
		this.setState({ loadingMore: true });
		const last = this.getLastId();
		Fetch.get('/notification/old/', { last })
			.then((res) => {
				this.props.dispatch({ type: 'PUSH_NOTIFICATIONS', value: res.body.notifications });
			})
			.catch((err) => console.error(err))
			.finally(() => this.setState({ loadingMore: false }));
	};

	getLastId = () => {
		const { notifications } = this.props;
		const last = notifications[notifications.length - 1];
		return last ? last.id : null;
	};

	onSelectItem = (item) => {
		setTimeout(() => this.setState({ modalVisible: true, selectedItem: item }), 50);
	};

	closeCollapse = () => {
		this.setState({ modalVisible: false });
	};

	keyExtractor = (item) => item.id + '';
	renderItem = ({ item }) => <Notification item={item} onSelect={this.onSelectItem} />;

	render() {
		const { refreshing, loadingMore, modalVisible, selectedItem } = this.state;
		return (
			<React.Fragment>
				<View style={{ height: FULL_HIGHT - 64, width: FULL_WIDTH, backgroundColor: 'white' }}>
					<View style={tailwind('absolute')}>
						<Image source={fondo} style={{ width: FULL_WIDTH, height: FULL_HIGHT }} />
					</View>
					<View style={tailwind('h-24')}></View>
					<View
						style={[
							tailwind('flex rounded-t-2xl'),
							{ backgroundColor: background, zIndex: 0 },
						]}
					>
						<FlatList
							style={[tailwind('flex px-3 h-full')]}
							ListHeaderComponent={
								<Text style={[tailwind('text-2xl ml-5 mt-4 mb-2'), typefaces.pb]}>
									Notificaciones
								</Text>
							}
							ListEmptyComponent={EmptyMessage}
							refreshing={refreshing}
							onRefresh={this.loadNew}
							data={this.props.notifications}
							renderItem={this.renderItem}
							keyExtractor={this.keyExtractor}
							ItemSeparatorComponent={ItemSeparator}
							ListFooterComponent={<ListFooter loading={loadingMore} />}
							onEndReached={this.onEndReached}
							onEndReachedThreshold={0.3}
						/>
						{selectedItem && (
							<NotificationModal
								visible={modalVisible}
								onClose={this.closeCollapse}
								selectedItem={selectedItem}
							/>
						)}
					</View>
				</View>
			</React.Fragment>
		);
	}
}

const ItemSeparator = memo(() => <View style={tailwind('h-2')} />);

const ListFooter = memo(({ loading }) => {
	return (
		<View style={tailwind('p-6 mb-24')}>
			<ActivityIndicator color="black" animating={loading} />
		</View>
	);
});

const EmptyMessage = memo(() => {
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
