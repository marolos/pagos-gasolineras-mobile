import React,{ memo } from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import Fetch from '../utils/Fetch';
import tailwind from 'tailwind-rn';
import { makeCancelable } from '../utils/utils';
import Ripple from 'react-native-material-ripple';
import { typefaces, shadowStyle3 } from '../utils/styles';
import Modal from 'react-native-modal';
import FloatingButton from '../shared/FloatingButton';
import FilterIcon from '../icons/FilterIcon';
import ExclamationIcon from '../icons/ExclamationIcon';
import CollapseModalFilters from './CollapseModalFilters';
import SimpleToast from 'react-native-simple-toast';
import { FULL_WIDTH, FULL_HIGHT } from '../utils/constants';
import { formatISODate } from '../utils/dateUtils';
import { background, 
			white, 
			dollar_text, 
			btn_secundary, 
			done, 
			info_text } from '../utils/colors';
import gasLogo from '../../assets/img/gasolina_menu.png';
import exitIcon from '../../assets/img/salir.png';
import BackIcon from '../icons/SmallBackIcon';
import PurchaseView from './PurchaseView';

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
			purchase: null,
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
			showPurchase: false
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
		this.setState({ purchase: purchase, showPurchase: true })
		//this.props.navigation.push('purchaseDetail', purchase);
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
			<View style={{ height: FULL_HIGHT - 25, width: FULL_WIDTH, backgroundColor: white }}>
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
				<View style={{zIndex: 1 }}>
					<BackTitle navigation={this.props.navigation}/>
				</View> 
					<ScrollView
						style={[tailwind('flex rounded-2xl pb-6'), { backgroundColor: background, zIndex: 10 }]}
						contentInset={4, 4, 4, 4}
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
							) : this.state.purchases.length === 0 ? (
								<EmptyMessage />
							) : (
								<View>
									 <View style={tailwind('h-4')}></View>
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
				<PurchaseViewModal 
					purchase={this.state.purchase}
					show={this.state.showPurchase} 
					onClose={() => this.setState({ showPurchase: false })}/>
			</View>
		);
	}
}

const BackTitle = memo(({ navigation }) => {
	return (
		<View style={{ zIndex: 1 }}>
			<Ripple
				onPress={navigation.goBack}
				style={tailwind('rounded-full p-2 w-12 items-center')}
				rippleCentered={true}
			>
				<BackIcon />
			</Ripple>
			<Text style={[tailwind('text-2xl ml-16 mb-4'), typefaces.pb]}>Historial</Text>
		</View>
	)
})

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
		<TouchableOpacity style={[tailwind('mx-2 my-1'),{ backgroundColor: white }]} onPress={() => onTap()} activeOpacity={0.9}>
			<View style={[tailwind('flex flex-row rounded-xl py-2 px-3 border border-gray-300'), 
			{ backgroundColor: white, paddingBottom: 10, paddingTop: 20 }, shadowStyle3]}>
				<View style={tailwind('flex mt-2')}>
					<Image source={gasLogo} style={{ width: 25, height: 30 }}></Image>
				</View>
				<View  style={tailwind('w-11/12')}>
					<View style={tailwind('ml-4')}>
						<Text>
							<Text style={[tailwind('font-bold'), typefaces.pm]}>Compra en</Text>
							{' '}
							<Text style={[tailwind('font-bold'), typefaces.pm]}>
								{purchase?.gas_station?.name} por
							</Text>{' '}
							{' '}
							<Text style={[{ color: dollar_text }, tailwind('font-bold'), typefaces.pm]}>
								${parseFloat(purchase?.amount).toFixed(2)}
							</Text>
						</Text>
					</View>
					{/* <View style={tailwind('flex flex-row justify-end items-center')}>
						<Text style={[tailwind('text-gray-700 text-xs mr-1'), typefaces.pm]}>Factura</Text>
						<InfoIcon width={14} height={14} fill={'#555'} />
					</View> */}
					<View style={tailwind('flex flex-row ml-4 mt-1')}>
						<Text style={[tailwind('text-gray-700 text-xs'), typefaces.pm]}>
							{formatISODate(purchase?.created_at ? purchase?.created_at : new Date())}{' '}
						</Text>
					</View>
					<View style={tailwind('flex flex-row justify-end mr-1')}>
							<Text style={[tailwind('text-xs italic')]}>
								{purchase?.is_done ? (
									<Text style={{ color: done }}>Efectuado</Text>
								) : new Date(purchase?.code_expiry_date) > new Date() ? (
									<Text style={{ color: btn_secundary }}>En proceso</Text>
								) : (
									<Text style={tailwind('text-gray-700')}>Expirada</Text>
								)}
							</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

function EmptyMessage(props) {
	return (
		<View style={tailwind('items-center mb-12 mt-16')}>
			<View style={tailwind('px-12')}>
				<Text style={[tailwind('text-sm text-center'), typefaces.pm, { color: info_text }]}>
					No ha realizado ningún movimiento.
				</Text>
			</View>
		</View>
	);
}

const PurchaseViewModal = ({ show, onClose, purchase }) => {
	return (
		<Modal
			isVisible={show}
			animationIn="fadeIn"
			animationOut="fadeOut"
			backdropTransitionOutTiming={0}
			onBackdropPress={onClose}
			style={tailwind('flex items-center')}
		>
			<View style={tailwind('w-full bg-white rounded-2xl')}>
				<View style={tailwind('flex flex-row justify-end mr-2 mt-3')}>
					<Ripple style={[tailwind('flex flex-row justify-center w-8 p-2')]} onPress={()=> onClose()}>
						<Image source={exitIcon} style={{ width: 8, height: 8 }}/>
					</Ripple>
				</View>
				<View style={tailwind('px-10 pb-5')}>
					<Text style={[tailwind('text-xl'), typefaces.pb]}>Detalle de la recarga</Text>
					<View style={tailwind('justify-center')}>
						<PurchaseView purchase={purchase}/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default RecordsView;
