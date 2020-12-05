import React, { memo } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import emptyImage from '../../assets/background/empty.png';
import Fetch from '../utils/Fetch';
import { makeCancelable } from '../utils/utils';
import TipAd from './TipAd';
import Line from '../shared/Line';

class TipsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			loadingMore: false,
		};
	}

	componentDidMount() {
		this.loadNew();
	}

	componentWillUnmount() {
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

	renderItem = ({ item }) => <TipAd tipad={item} />;
	keyExtractor = (item) => item.id + '';

	render() {
		const { refreshing, loadingMore } = this.state;
		const { tips } = this.props;
		return (
			<FlatList
				data={tips}
				renderItem={this.renderItem}
				keyExtractor={this.keyExtractor}
				refreshing={refreshing}
				onRefresh={this.loadNew}
				ListEmptyComponent={EmptyMessage}
				ListFooterComponent={<ListFooter loading={loadingMore} />}
				ItemSeparatorComponent={ItemSeparator}
			/>
		);
	}
}

async function loadItems(old = false, last) {
	try {
		const res = await Fetch.get('/company/tipads/tips/');
		const { tips, liked } = res.body;
		return tips.map((tip) => ({ ...tip, liked: !!liked.find((id) => id === tip.id) }));
	} catch (err) {
		return [];
	}
}

const ListFooter = memo(({ loading }) => {
	return (
		<View style={tailwind('p-6')}>
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
					No se han publicados tips
				</Text>
			</View>
		</View>
	);
});

const ItemSeparator = memo(() => <Line style={tailwind('mt-2 mb-1 h-1')}/>);

export default connect(({ tips }) => ({ tips }))(TipsView);
