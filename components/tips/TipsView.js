import React, { memo } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import emptyImage from '../../assets/background/empty.png';

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

	loadNew = () => {};

	render() {
		const { refreshing, loadingMore } = this.state;
		return (
			<FlatList
				data={this.props.tips}
				refreshing={refreshing}
				onRefresh={this.loadNew}
				ListEmptyComponent={EmptyMessage}
				ListFooterComponent={<ListFooter loading={loadingMore} />}
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

export default connect()(TipsView);
