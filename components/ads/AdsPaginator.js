import React, { memo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, ADS_MAX_HEIGHT } from '../utils/constants';
import Fetch from '../utils/Fetch';
import { makeCancelable } from '../utils/utils';
import { btn_text } from '../utils/colors';

const MAX_ADS = 4;
const DURATION = 4

function AdsPaginator({ ads, dispatch, reload }) {
	React.useEffect(() => {
		const cleanUp = loadData(dispatch);
		return cleanUp;
	}, [reload]);

	let split0 = [], split1 = [].slice();
	if (ads.length <= MAX_ADS) {
		split0 = ads;
	} else {
		split0 = ads.slice(0, MAX_ADS);
		split1 = ads.slice(MAX_ADS);
	}

	return (
		<React.Fragment>
			<View style={styles.main}>
				<Swiper
					key={'0'}
					showsButtons={false}
					height={ADS_MAX_HEIGHT}
					width={FULL_WIDTH}
					dot={_dot}
					activeDot={_activeDot}
					paginationStyle={{ bottom: 10 }}
					autoplay
					loop
					autoplayTimeout={DURATION}
				>
					{split0.map((ad) => (
						<AdsItem href={ad.img_path} key={ad.id} />
					))}
				</Swiper>
			</View>
			{split1.length > 0 && (
				<View style={[styles.main, tailwind('mt-4')]}>
					<Swiper
						key={'1'}
						showsButtons={false}
						height={ADS_MAX_HEIGHT}
						width={FULL_WIDTH}
						dot={_dot}
						activeDot={_activeDot}
						paginationStyle={{ bottom: 10 }}
						autoplay
						autoplayTimeout={DURATION/2}
						loop
					>
						{split1.map((ad) => (
							<AdsItem href={ad.img_path} key={ad.id} />
						))}
					</Swiper>
				</View>
			)}
		</React.Fragment>
	);
}

const AdsItem = memo(({ href }) => (
	<View style={{ backgroundColor: btn_text, opacity: 1 }}>
		<FastImage
			style={styles.image}
			source={{ uri: href }}
			resizeMode={FastImage.resizeMode.stretch}
		/>
	</View>
));

const Dot = memo(() => <View style={styles.dot} />);
const _dot = <Dot />
const ActiveDot = memo(() => <View style={styles.activeDot} />);
const _activeDot = <ActiveDot />

const loadData = (dispatch) => {
	let req = makeCancelable(
		Fetch.get('/company/tipads/ads?limit=6'),
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
