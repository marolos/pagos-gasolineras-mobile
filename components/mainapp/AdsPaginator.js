import React, { memo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, ADS_MAX_HEIGHT } from '../utils/constants';
import { fakeFetch, itemsMocks } from '../utils/mocks';
import { makeCancelable } from '../utils/utils';

function AdsPaginator(props) {
	const [state, setState] = React.useState({
		items: [],
		loading: true,
	});

	React.useEffect(() => {
		const req = makeCancelable(
			fakeFetch(itemsMocks, 100),
			(_itemsMocks) => {
				setState({ items: _itemsMocks, loading: false });
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
				key={state.items.length}
				showsButtons={false}
				loop={false}
				height={ADS_MAX_HEIGHT}
				width={FULL_WIDTH}
				dot={<Dot />}
				activeDot={<ActiveDot />}
				paginationStyle={{ bottom: 10 }}
			>
				{state.loading ? (
					<View style={styles.container}>
						<ActivityIndicator
							style={styles.loader}
							animating={state.loading}
							size="small"
							color="#000"
						/>
					</View>
				) : (
					state.items.map((item, index) => <AdsItem href={item.href} key={index} />)
				)}
			</Swiper>
		</View>
	);
}

function AdsItem({ href }) {
	return (
		<View>
			<FastImage
				style={styles.image}
				source={{ uri: href }}
				resizeMode={FastImage.resizeMode.stretch}
			/>
		</View>
	);
}

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

export default AdsPaginator;
