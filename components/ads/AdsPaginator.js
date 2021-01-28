import React, { memo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, FULL_HIGHT } from '../utils/constants';
import Fetch from '../utils/Fetch';
import { makeCancelable } from '../utils/utils';
import { btn_text } from '../utils/colors';

const DURATION = 4;

function AdsPaginator({ ads, dispatch, reload }) {
	React.useEffect(() => {
		const cleanUp = loadData(dispatch);
		return cleanUp;
	}, [reload]);

	return (
		<Swiper
			key={'0'}
			showsButtons={false}
			dot={_dot}
			activeDot={_activeDot}
			paginationStyle={{ bottom: 10 }}
			autoplay
			loop
			autoplayTimeout={DURATION}
		>
			{ads.map((ad) => (
				<AdsItem href={ad.img_path} key={ad.id} />
			))}
		</Swiper>
	);
}

const AdsItem = memo(({ href }) => (
	<View style={{ backgroundColor: btn_text, backgroundColor:'transparent' }}>
		<FastImage
			style={styles.image}
			source={{ uri: href }}
			resizeMode={FastImage.resizeMode.stretch}
		/>
	</View>
));

const Dot = memo(() => (
	<View
		style={[
			styles.dot,
			{  },
		]}
	/>
));
const ActiveDot = memo(() => <View style={[styles.activeDot]} />);
const _dot = <Dot />;
const _activeDot = <ActiveDot />;

const loadData = (dispatch) => {
	let req = makeCancelable(
		Fetch.get('/company/tipads/ads?limit=9'),
		(res) => {
			dispatch({ type: 'SET_ADS', value: res.body.ads });
		},
		(err) => {
			if (err.isCanceled) return;
		},
	);
	return () => {
		req.cancel();
	};
};

const styles = {
	dot: tailwind('w-2 h-2 m-1 bg-white bg-opacity-25 border border-white rounded-full'),
	activeDot: tailwind('w-2 h-2 m-1 bg-white rounded-full'),
	image: { width: FULL_WIDTH - 24, height: FULL_HIGHT - 82, borderRadius: 24},
	loader: tailwind('flex flex-row justify-center items-center'),
};

export default connect(({ ads }) => ({ ads }))(memo(AdsPaginator));
