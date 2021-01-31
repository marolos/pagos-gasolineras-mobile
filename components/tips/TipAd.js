import AwesomeDebouncePromise from 'awesome-debounce-promise';
import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import LikeIcon from '../icons/HeartIcon';
import { FULL_WIDTH } from '../utils/constants';
import { formatISORelative } from '../utils/dateUtils';
import Fetch from '../utils/Fetch';
import { typefaces, shadowStyle3 } from '../utils/styles';
import { btn_text } from '../utils/colors';

class TipAd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			liked: this.props.data.liked,
			imgHeight: 200,
		};
		this.likeDebounced = AwesomeDebouncePromise((liked) => {
			const { id } = this.props.data;
			return liked
				? Fetch.put(`/company/tipads/${id}/like/`)
				: Fetch.put(`/company/tipads/${id}/dislike/`);
		}, 800);
	}

	componentDidMount() {
		this.getDimensions();
	}

	getDimensions = () => {
		Image.getSize(this.props.data.img_path, (w, h) => {
			const scaleFactor = (w + 32) / FULL_WIDTH;
			const imageHeight = h / scaleFactor;
			this.setState({ imgHeight: imageHeight });
		});
	};

	like = () => {
		const newLiked = !this.state.liked;
		this.likeDebounced(newLiked)
			.then(() => {
				this.setState(() => ({ liked: newLiked }));
			})
			.catch(() => {
				this.setState(() => ({ liked: !newLiked }));
			});
	};

	render() {
		console.log(this.props.data);
		const { liked, imgHeight } = this.state;
		const { company, created_at, img_path, title, description, like_count } = this.props.data;
		const count = liked ? like_count + 1 : like_count;
		return (
			<React.Fragment>
				<View style={[tailwind('rounded-xl bg-white mx-1 border border-gray-300'), shadowStyle3]}>
				   <View style={tailwind('flex flex-row justify-between px-4 pb-1 pt-2 items-center')}>
				   	{/* <Text style={[tailwind('text-lg'), typefaces.psb, { color: btn_text }]}>{company?.business_name}</Text> */}
				   	<Text style={[tailwind('text-xs text-gray-600'), typefaces.pr]}>
				   		{formatISORelative(created_at)}
				   	</Text>
				   </View>
				   <View style={tailwind('px-4')}>
				       <FastImage
				       	source={{ uri: img_path }}
				       	style={{ height: imgHeight }}
				       	resizeMode={FastImage.resizeMode.stretch}
				       />
				       	<View style={tailwind('py-1')}>
				       		<Text style={[typefaces.pm]}>{title}</Text>
				       		<Text style={[tailwind('w-64 text-gray-700')]}>{description}</Text>
				       	</View>
				       <View style={tailwind('flex flex-row justify-between items-center')}>
							 <Text style={[typefaces.psb, tailwind('text-xs')]}>{count} me gusta</Text>
				       	<LikeButton liked={liked} onPress={this.like} count={count} />
				       </View>

					</View>
				
				</View>
			</React.Fragment>
		);
	}
}

const LikeButton = memo(({ liked, onPress, count }) => (
	// <View style={tailwind('flex flex-row items-center')}>
	<Ripple
		style={tailwind('flex flex-row items-center justify-center rounded-full w-12 h-12')}
		onPress={onPress}
		rippleDuration={320}
		rippleColor="#C50510"
		rippleOpacity={1.1}
		rippleCentered
	>
		<LikeIcon width={22} fill={liked ? "#D61620" : 'none'} stroke={liked ? "#D61620" : "#9A999E"} />
		
	</Ripple>
	// </View>
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
