import React from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl, Image } from 'react-native';
import Fetch from '../utils/Fetch';
import tailwind from 'tailwind-rn';
import { makeCancelable } from '../utils/utils';
import Ripple from 'react-native-material-ripple';
import ScheduleIcon from '../icons/ScheduleIcon';
import InfoIcon from '../icons/InfoIcon';
import { typefaces } from '../utils/styles';
import { formatISODate } from '../buy/utils';
import emptyImage from '../../assets/background/empty.png';
import FloatingButton from '../shared/FloatingButton';
import FilterIcon from '../icons/FilterIcon';
import ExclamationIcon from '../icons/ExclamationIcon';
import CollapseModalFilters from './CollapseModalFilters';
import SimpleToast from 'react-native-simple-toast';
import { FULL_WIDTH, FULL_HIGHT } from '../utils/constants';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
	const paddingToBottom = 20;
	return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

class RecordsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			purchases: [],
			loading: true,
			loadMore: false,
			refreshing: false,
			isEndPage: false,
			fromDateTime: null,
			toDateTime: null,
			gasStation: null,
			initfbtn: 0,
			endfbtn: 0,
			showFbtn: false,
			filtersVisible: false,
			filterActive: false,
		};
	}

	componentDidMount() {
		this.loadData({ page: this.state.page });
	}

	loadData(filters) {
		this.setState({ loading: true });
		this.cancelControl = makeCancelable(
			Fetch.get('/purchase/user/', filters),
			(value) => {
				if (this.state.filterActive)
					this.setState({
						purchases: value.body,
						loading: false,
						initfbtn: 0,
						endfbtn: 1,
						isEndPage: false,
					});
				else this.setState({ purchases: value.body, loading: false });
			},
			(err) => {
				if (err.isCanceled) return;
				this.setState({ purchases: [], loading: false, filterActive: false });
			},
		);
	}

	loadMoreData(filters) {
		if (!this.state.isEndPage) {
			this.setState({ loadMore: true, page: ++this.state.page });
			this.cancelControl = makeCancelable(
				Fetch.get('/purchase/user/', filters),
				(value) => {
					if (value.body.length > 0) {
						for (var i in value.body) {
							this.state.purchases.push(value.body[i]);
						}
						this.setState({ loadMore: false });
					} else {
						this.setState({ loadMore: false, isEndPage: true });
					}
				},
				(err) => {
					if (err.isCanceled) return;
					this.setState({ loadMore: false });
				},
			);
		}
	}

	componentWillUnmount() {
		this.cancelControl.cancel();
	}

	onRefresh = () => {
		this.setState({ refreshing: true, page: 0 });
		let filters = { page: 0 };
		if (this.state.fromDateTime && this.state.toDateTime) {
			filters['to'] = formatISODate(this.state.toDateTime, 'yyyy-MM-dd HH:mm');
			filters['from'] = formatISODate(this.state.fromDateTime, 'yyyy-MM-dd HH:mm');
		} else if (this.state.gasStation) {
			filters['gas'] = this.state.gasStation.id;
		}
		this.cancelControl = makeCancelable(
			Fetch.get('/purchase/user/', filters),
			(res) => {
				this.setState({
					purchases: res.body,
					loading: false,
					refreshing: false,
					isEndPage: false,
					page: 0,
				});
			},
			(err) => {
				this.setState({ loading: false, refreshing: false });
				console.error(err);
			},
		);
	};

	onFilter = (fromDatetime, toDatetime, gasStation) => {
		this.setState({ filtersVisible: false });
		SimpleToast.show('Filtrando...');
		let filters = { page: 0 };
		if (fromDatetime && toDatetime) {
			filters['from'] = formatISODate(fromDatetime, 'yyyy-MM-dd HH:mm');
			filters['to'] = formatISODate(toDatetime, 'yyyy-MM-dd HH:mm');
			this.setState({
				fromDateTime: fromDatetime,
				toDateTime: toDatetime,
				gasStation: gasStation,
				page: 0,
				filterActive: true,
			});
		} else if (gasStation) {
			filters['gas'] = gasStation.id;
			this.setState({
				fromDateTime: null,
				toDateTime: null,
				gasStation: gasStation,
				page: 0,
				filterActive: true,
			});
		} else {
			this.setState({
				fromDateTime: null,
				toDateTime: null,
				gasStation: null,
				page: 0,
				filterActive: false,
			});
		}
		this.loadData(filters);
	};

	onItemTap = (purchase) => {
		this.props.navigation.push('purchaseDetail', purchase);
	};

	onScroll = (nativeEvent) => {
		if (isCloseToBottom(nativeEvent)) {
			let filters = { page: this.state.page + 1 };
			if (this.state.fromDateTime && this.state.toDateTime) {
				filters['to'] = formatISODate(this.state.toDateTime, 'yyyy-MM-dd HH:mm');
				filters['from'] = formatISODate(this.state.fromDateTime, 'yyyy-MM-dd HH:mm');
			} else if (this.state.gasStation) {
				filters['gas'] = this.state.gasStation.id;
			}
			this.loadMoreData(filters);
		}
	};

	onClearDateTime = () => {
		this.setState({ fromDateTime: null, toDateTime: null });
	};

	onScrollEnd = () => {
		if (!this.state.showFbtn && !this.state.filterActive) {
			this.setState({ initfbtn: 0, endfbtn: 1, showFbtn: true });
			setTimeout(() => this.setState({ initfbtn: 1, endfbtn: 0, showFbtn: false }), 3500);
		}
	};

	onFilterPress = () => {
		this.setState({ filtersVisible: true, endfbtn: 0, initfbtn: 1, showFbtn: false });
	};

	onFilterCancel = () => {
		this.setState({
			filtersVisible: false,
			filterActive: false,
			fromDateTime: null,
			toDateTime: null,
			gasStation: null,
		});
		this.onRefresh();
	};

	render() {
		return (
			<View style={{ height: FULL_HIGHT - 80, width: FULL_WIDTH }}>
				<FloatingButton
					icon={
						!this.state.filterActive ? (
							<FilterIcon />
						) : (
							<View style={{ alignItems: 'center' }}>
								<FilterIcon />
								<View style={[tailwind('absolute'), { top: 20, left: 20 }]}>
									<ExclamationIcon />
								</View>
							</View>
						)
					}
					init={this.state.initfbtn}
					end={this.state.endfbtn}
					onPress={() => this.onFilterPress()}
				/>
				<ScrollView
					scrollEventThrottle={400}
					onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}
					onScrollEndDrag={() => this.onScrollEnd()}
					refreshControl={
						<RefreshControl onRefresh={this.onRefresh} refreshing={this.state.refreshing} />
					}
				>
					<View>
						{this.state.loading ? (
							<View style={[tailwind('flex flex-row justify-center'), { height: 200 }]}>
								<ActivityIndicator animating color="black" size="large" />
							</View>
						) : this.state.purchases.length == 0 ? (
							<EmptyMessage />
						) : (
							<View>
								<PurchasesList onItemTap={this.onItemTap} data={this.state.purchases} />
								{this.state.loadMore ? (
									<View style={[tailwind('flex flex-row justify-center'), { height: 30 }]}>
										<ActivityIndicator animating color="black" size="large" />
									</View>
								) : (
									<View />
								)}
							</View>
						)}
					</View>
				</ScrollView>
				<CollapseModalFilters
					visible={this.state.filtersVisible}
					onFilter={this.onFilter}
					initFromDateTime={this.state.fromDateTime}
					initToDateTime={this.state.toDateTime}
					initGasStation={this.state.gasStation}
					onCancel={this.onFilterCancel}
					closeCollapse={() => {
						if (this.state.filterActive) {
							this.setState({
								filtersVisible: false,
								endfbtn: 1,
								initfbtn: 0,
								showFbtn: true,
							});
						} else {
							this.setState({ filtersVisible: false });
						}
					}}
				/>
			</View>
		);
	}
}

function PurchasesList({ data, onItemTap }) {
	return (
		<View>
			{data.map((item) => (
				<View key={'p' + item.id}>
					<PurchaseItem purchase={item} onTap={() => onItemTap(item)} />
				</View>
			))}
		</View>
	);
}

function PurchaseItem({ purchase, onTap }) {
	return (
		<Ripple style={tailwind('mx-2 my-1')} onPress={() => onTap()}>
			<View style={tailwind('flex rounded-md py-2 px-3 border border-gray-300')}>
				<View style={tailwind('flex flex-row')}>
					<View style={tailwind('mt-1 mr-1')}>
						<ScheduleIcon />
					</View>
					<Text>
						<Text style={[tailwind('font-semibold'), typefaces.pm]}>Compra </Text>
						en{' '}
						<Text style={[tailwind('font-semibold'), typefaces.pm]}>
							{purchase?.gas_station?.name}
						</Text>{' '}
						por{' '}
						<Text style={[tailwind('text-green-600'), typefaces.pm]}>
							${parseFloat(purchase?.amount).toFixed(2)}
						</Text>
					</Text>
				</View>
				<View style={tailwind('flex flex-row justify-end items-center')}>
					<Text style={[tailwind('text-gray-700 text-xs mr-1'), typefaces.pm]}>Factura</Text>
					<InfoIcon width={14} height={14} fill={'#555'} />
				</View>
				<View style={tailwind('flex flex-row ml-4')}>
					<Text style={[tailwind('text-gray-700 text-xs'), typefaces.pm]}>
						{formatISODate(purchase?.created_at ? purchase?.created_at : new Date())}{' '}
					</Text>
					<Text style={[tailwind('text-xs')]}>
						{purchase?.is_done ? (
							<Text style={tailwind('text-red-500')}>(efectuado)</Text>
						) : new Date(purchase?.code_expiry_date) > new Date() ? (
							<Text style={tailwind('text-yellow-500')}>(en proceso)</Text>
						) : (
							<Text style={tailwind('text-gray-700')}>(expirada)</Text>
						)}
					</Text>
				</View>
			</View>
		</Ripple>
	);
}

function EmptyMessage(props) {
	return (
		<View style={tailwind('items-center mb-12 mt-16')}>
			<View>
				<Image source={emptyImage} style={[tailwind('w-32 h-48')]} />
			</View>
			<View style={tailwind('px-12')}>
				<Text style={[tailwind('text-gray-700 text-lg text-center'), typefaces.pm]}>
					No hay compras para mostrar.
				</Text>
			</View>
		</View>
	);
}

export default RecordsView;
