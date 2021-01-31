import React, { memo } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import Fetch from '../utils/Fetch';
import { makeCancelable } from '../utils/utils';
import { TabOptions } from '../redux/ui/reducers';
import { setActiveTab } from '../redux/ui/actions';
import TipAd from './TipAd';
import fondo from '../../assets/img/fondo.png';
import { FULL_WIDTH, FULL_HIGHT } from '../utils/constants';
import { background, info_text } from '../utils/colors';


class TipsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			loadingMore: false,
		};
	}

	componentDidMount() {
		this.unsubscribeFocus = this.props.navigation.addListener('focus', () => {
			this.props.dispatch(setActiveTab(TabOptions.TIPS));
		});
		this.loadNew();
	}

	componentWillUnmount() {
		if (this.unsubscribeFocus) this.unsubscribeFocus();
		if (this.cancelReq) this.cancelReq.cancel();
	}

	loadNew = () => {
		this.setState({ refreshing: true });
		this.cancelReq = makeCancelable(
			loadItems(),
			(tips) => {
				this.props.dispatch({ type: 'SET_TIPS', value: tips });
				this.setState({ refreshing: false });
			},
			(err) => {
				err;
				this.setState({ refreshing: false });
			},
		);
	};

	loadOld = () => {
		this.setState({ loadingMore: true });
		this.cancelReq = makeCancelable(
			loadItems(true, this.getLastId()),
			(tips) => {
				this.props.dispatch({ type: 'PUSH_TIPS', value: tips });
				this.setState({ loadingMore: false });
			},
			(err) => {
				err;
				this.setState({ loadingMore: false });
			},
		);
	};

	getLastId = () => {
		const { tips } = this.props;
		const last = tips.length > 0 ? tips[tips.length - 1].id : null;
		return last;
	};

	renderItem = ({ item }) => <TipAd data={item} />;
	keyExtractor = (item) => item.id + '';

	render() {
		const { refreshing, loadingMore } = this.state;
		const { tips } = this.props;
		return (
			<SafeAreaView style={{ height: FULL_HIGHT - 64, width: FULL_WIDTH, backgroundColor: 'white' }}>
            <View style={tailwind('absolute')}>
			    		<Image source={fondo} style={{ width: FULL_WIDTH, height: FULL_HIGHT }} />
			    	</View>
					 <View style={tailwind('h-24')}></View>
				<View style={[tailwind('flex rounded-t-2xl'), { backgroundColor: background, zIndex: 0 }]}>
			      <FlatList
					  style={[tailwind('flex px-3 h-full')]}
 			        	data={tips}
			        	renderItem={this.renderItem}
			        	keyExtractor={this.keyExtractor}
			        	refreshing={refreshing}
						  onRefresh={this.loadNew}
						  ListHeaderComponent={<Text style={[tailwind('text-2xl ml-5 mt-4 mb-2'), typefaces.pb]}>Tips</Text>}
			        	ListEmptyComponent={EmptyMessage}
			        	ListFooterComponent={<ListFooter loading={loadingMore} />}
			        	ItemSeparatorComponent={ItemSeparator}
			        	onEndReached={this.loadOld}
			        	onEndReachedThreshold={0.3}
			        />
				</View>
			</SafeAreaView>
		);
	}
}

async function loadItems(old = false, last) {
	try {
		const fetchProm = old
			? Fetch.get('/company/tipads/tips/old/', { last })
			: Fetch.get('/company/tipads/tips/');
		const res = await fetchProm;
		const { tips, likes } = res.body;
		return tips.map((tip) => {
			return { ...tip, liked: !!likes.find((id) => id === tip.id) };
		});
	} catch (err) {
		return [];
	}
}

const ListFooter = memo(({ loading }) => {
	return (
		<View style={tailwind('p-6 mb-20')}>
			<ActivityIndicator color="black" animating={loading} />
		</View>
	);
});

const EmptyMessage = memo(() => {
	return (
		<View style={tailwind('items-center mt-12')}>
			<View style={tailwind('px-8')}>
				<Text style={[tailwind('text-base text-center'), typefaces.pm, { color: info_text }]}>
					No se han publicados tips
				</Text>
			</View>
		</View>
	);
});

const ItemSeparator = memo(() => <View style={tailwind('h-2')} />);

export default connect(({ tips }) => ({ tips }))(TipsView);
