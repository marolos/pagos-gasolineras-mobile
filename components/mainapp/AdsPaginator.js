import React, { memo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, ADS_MAX_HEIGHT } from '../utils/constants';
import Fetch from '../utils/Fetch';
import { makeCancelable } from '../utils/utils';

function AdsPaginator({ ads, dispatch }) {
	React.useEffect(() => {
		const req = makeCancelable(
			Fetch.get('/company/tipads/ads/'),
			(res) => {
				dispatch({ type: 'SET_ADS', value: res.body.ads });
			},
			(err) => {
				if (err.isCanceled) return;
			},
		);

		return () => req.cancel();
	}, []);

	return (
		<View style={styles.main}>
			<Swiper
				key={ads.length}
				showsButtons={false}
				loop={false}
				height={ADS_MAX_HEIGHT}
				width={FULL_WIDTH}
				dot={<Dot />}
				activeDot={<ActiveDot />}
				paginationStyle={{ bottom: 10 }}
			>
				{ads.map((ad) => (
					<AdsItem href={ad.img_path} key={ad.id} />
				))}
			</Swiper>
		</View>
	);
}

const AdsItem = memo(({ href }) => {
	return (
		<FastImage
			style={styles.image}
			source={{ uri: href }}
			resizeMode={FastImage.resizeMode.stretch}
		/>
	);
});

const Dot = memo(() => <View style={styles.dot} />);
const ActiveDot = memo(() => <View style={styles.activeDot} />);

const styles = {
	main: { width: FULL_WIDTH, height: ADS_MAX_HEIGHT },
	container: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
		padding: 10,
	},
	dot: tailwind('w-2 h-2 m-1 bg-white bg-opacity-25 border border-white rounded-full'),
	activeDot: tailwind('w-2 h-2 m-1 bg-white rounded-full'),
	image: { width: FULL_WIDTH, height: ADS_MAX_HEIGHT },
	loader: tailwind('flex flex-row justify-center items-center'),
};

export default connect(({ ads }) => ({ ads }))(memo(AdsPaginator));

/* {state.loading ? (
					<View style={styles.container}>
						<ActivityIndicator
							style={styles.loader}
							animating={state.loading}
							size="small"
							color="#000"
						/>
					</View>
				) : ( */
