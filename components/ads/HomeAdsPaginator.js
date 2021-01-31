import React, { memo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, ADS_MAX_HEIGHT } from '../utils/constants';
import Fetch from '../utils/Fetch';
import { makeCancelable } from '../utils/utils';
import { btn_text, btn_primary } from '../utils/colors';

const DURATION = 4;

function HomeAdsPaginator({ ads_home, dispatch, reload }) {
	React.useEffect(() => {
		const cleanUp = loadData(dispatch);
		return cleanUp;
	}, [reload]);

	return (
		<View style={styles.main}>
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
		    	{ads_home.map((ad) => (
		    		<AdsItem href={ad.img_path} key={ad.id} />
		    	))}
		    </Swiper>
		</View>
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
		Fetch.get('/company/tipads/ads/?limit=6&show_in_home=true'),
		(res) => {
			dispatch({ type: 'SET_ADS_HOME', value: res.body.ads });
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
	main: { width: FULL_WIDTH, height: ADS_MAX_HEIGHT },
	container: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
		padding: 10,
	},
	dot: [tailwind('w-2 h-2 m-1 rounded-full'), { backgroundColor: btn_text }],
	activeDot: [tailwind('w-2 h-2 m-1 rounded-full'), { backgroundColor: btn_primary }],
	image: { width: FULL_WIDTH, height: ADS_MAX_HEIGHT, opacity: 0.9 },
	loader: tailwind('flex flex-row justify-center items-center'),
};

export default connect(({ ads_home }) => ({ ads_home }))(memo(HomeAdsPaginator));
