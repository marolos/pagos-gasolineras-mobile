import React, { memo } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import AdsPaginator from './AdsPaginator';
import tailwind from 'tailwind-rn';
import BalanceCard from './BalanceCard';
import { typefaces } from '../utils/styles';
import CollapseModalOptions from './CollapseModalOptions';
import { makeCancelable } from '../utils/utils';
import Fetch from '../utils/Fetch';
import { setActiveTab } from '../redux/ui/actions';
import { TabOptions } from '../redux/ui/reducers';
import fondo from '../../assets/img/fondo.png';
import gasolina from '../../assets/img/gasolina.png';
import { FULL_WIDTH, FULL_HIGHT } from '../utils/constants';
import { background, info_text } from '../utils/colors';
import AppBtn from '../shared/AppButton';

class BalancesView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedStation: null,
			modalVisible: false,
			balances: [],
			loading: true,
			refreshing: false,
		};
	}

	componentDidMount() {
		this.reqCancelControl = this.loadData();
		this.unsubscribeFocus = this.props.navigation.addListener('focus', () => {
			this.props.dispatch(setActiveTab(TabOptions.GAS));
		});
	}

	componentWillUnmount() {
		if (this.reqCancelControl) this.reqCancelControl.cancel();
		if (this.unsubscribeFocus) this.unsubscribeFocus();
	}

	loadData = (cb) => {
		const cancelControl = makeCancelable(
			Fetch.get('/users/balances/'),
			(res) => {
				this.setState({ balances: res.body.balances, loading: false });
				if (cb) cb();
			},
			(err) => {
				if (err.isCanceled) return;
				this.setState({ balances: [], loading: false });
				if (cb) cb();
			},
		);

		return cancelControl;
	};

	onRefresh = () => {
		this.setState({ refreshing: true });
		this.reqCancelControl = this.loadData(() => this.setState({ refreshing: false }));
	};

	onPressStation = (item) => {
		if (this.state.modalVisible) return;
		setTimeout(
			() =>
				this.setState({
					selectedStation: item,
					modalVisible: true,
				}),
			60,
		);
	};

	closeCollapse = () => {
		this.setState({ modalVisible: false });
	};

	render() {
		const { balances, refreshing, loading, selectedStation, modalVisible } = this.state;
		return (
			<View style={{ height: FULL_HIGHT - 64, width: FULL_WIDTH, backgroundColor: 'white' }}>
				<View style={tailwind('absolute')}>
			    		<Image source={fondo} style={{ width: FULL_WIDTH, height: FULL_HIGHT }} />
			    	</View>
				<View style={tailwind('h-24')}></View> 
			    <ScrollView
				   contentInset={4, 4, 4, 4}
				   style={[tailwind('flex rounded-t-2xl pb-6 px-3'), { backgroundColor: background, zIndex: 10 }]}
			    	refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
			    >
			    	{/* <AdsPaginator reload={refreshing}/> */}
			    	
			    	{/* {balances.length > 0 && (
			    		<View style={tailwind('mt-4 px-6')}>
			    			<Text style={[tailwind('text-black text-sm'), typefaces.pm]}>Gasolineras</Text>
			    			<Line style={tailwind('bg-gray-400 w-full mb-2')} />
			    		</View>
			    	)} */}
					 <View style={tailwind('h-4')}></View>
			    	<GasStationList loading={loading} data={balances} onItemPress={this.onPressStation} navigation={this.props.navigation} />
			    	{balances.length > 0 && selectedStation && (
			    		<CollapseModalOptions
			    			visible={modalVisible}
			    			station={selectedStation}
			    			closeCollapse={this.closeCollapse}
			    		/>
			    	)}
			    </ScrollView>
			</View>
		);
	}
}

const GasStationList = memo(({ data, onItemPress, loading, navigation }) => {
	if (loading) {
		return (
			<View style={[tailwind('flex flex-row justify-center'), { height: 200 }]}>
				<ActivityIndicator animating color="black" size="large" />
			</View>
		);
	}
	if (data.length < 1) {
		return (
			<View>
				<EmptyMessage navigation={navigation}/>
			</View>
		);
	}
	return (
		<View>
			{data.map((item) => (
				<BalanceCard
					key={item.id}
					company={item.company}
					gasStation={item.gas_station}
					total={item.total}
					onPress={() => onItemPress(item)}
				/>
			))}
		</View>
	);
});

function EmptyMessage({navigation}) {
	return (
		<View style={tailwind('items-center mt-20')}>
			<View>
				<Image source={gasolina} style={[tailwind('w-20 h-24')]} />
			</View>
			<View style={tailwind('px-8 mt-5')}>
				<Text style={[tailwind('text-lg text-center'), typefaces.pm, { color: info_text }]}>
					No haz recargado en ninguna gasolinera aún.
				</Text>
				<Text style={[tailwind('text-sm text-center'), typefaces.pr, { color: info_text }]}>
					Usa el buscador para encontrar tu gasolinera favorita
				</Text>
			</View>
			<View style={tailwind('mt-10')}>
				<AppBtn text={"Buscar"} 
				   onPress={()=> navigation.navigate('tabMenu', { screen: 'search', params: "" })}>
				</AppBtn>
			</View>
		</View>
	);
}

export default connect()(BalancesView);
