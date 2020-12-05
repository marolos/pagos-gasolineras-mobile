import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import LikeIcon from '../icons/LikeIcon';
import Line from '../shared/Line';
import { FULL_WIDTH } from '../utils/constants';
import { formatISORelative } from '../utils/dateUtils';
import { typefaces } from '../utils/styles';

class TipAd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			liked: this.props.tipad.liked,
			imgHeight: 200,
		};
	}

	componentDidMount() {
		this.getDimensions();
	}

	getDimensions = () => {
		Image.getSize(this.props.tipad.img_path, (w, h) => {
			const scaleFactor = w / FULL_WIDTH;
			const imageHeight = h / scaleFactor;
			this.setState({ imgHeight: imageHeight });
		});
	};

	like = () => {};

	render() {
		const { liked, imgHeight } = this.state;
		const { company, created_at, img_path, title, like_count } = this.props.tipad;
		const count = liked ? like_count + 1 : like_count;
		return (
			<View>
				<View style={tailwind('flex flex-row justify-between px-4 py-2 items-center')}>
					<Text style={[typefaces.pm]}>{company.business_name}</Text>
					<Text style={[tailwind('text-xs text-gray-700'), typefaces.pm]}>
						{formatISORelative(created_at)}
					</Text>
				</View>
				<Line />
				<FastImage
					source={{ uri: img_path }}
					style={{ height: imgHeight }}
					resizeMode={FastImage.resizeMode.stretch}
				/>
				<View style={tailwind('flex flex-row items-center justify-between px-4 py-2')}>
					<Text>{title}</Text>
					<LikeButton liked={liked} onPress={this.like} count={count} />
				</View>
			</View>
		);
	}
}

const LikeButton = memo(({ liked, onPress, count }) => (
	<View style={tailwind('flex flex-row items-center')}>
		<Ripple
			style={tailwind('flex flex-row items-center justify-center rounded-full w-12 h-12')}
			onPress={onPress}
			rippleDuration={250}
			rippleColor="#aba"
			rippleOpacity={1.1}
			rippleCentered
		>
			<LikeIcon width={22} fill={liked ? '#000' : 'none'} stroke={liked ? '#ababab' : '#444'} />
		</Ripple>
		<Text style={[tailwind('mt-2 text-xs'), typefaces.pm]}>{count}</Text>
	</View>
));

const azxcv = {
	company: 1,
	created_at: '2020-11-03T21:02:34.654289Z',
	created_by: 6,
	description: 'Prueba texto.',
	dislike_count: 0,
	gas_station: null,
	id: 19,
	img_path: 'https://i.imgur.com/p7DdKRx.png',
	kind: 'TIP',
	like_count: 1,
	liked: false,
	title: 'Test',
};

export default TipAd;
