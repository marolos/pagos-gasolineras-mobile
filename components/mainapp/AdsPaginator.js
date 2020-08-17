import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, ADS_MAX_HEIGHT } from '../../utils/constants';
import { fakeFetch, itemsMocks } from '../../utils/mocks';

function AdsPaginator(props) {
  const [state, setState] = React.useState({
    items: [],
    loading: false,
  });

  React.useEffect(() => {
    setState({
      ...state,
      loading: false
    })
    fakeFetch(itemsMocks).then((itemsMocks) => {
      setState({
        items: itemsMocks,
        loading: false
      })
    });
  }, []);


  return (
    <View style={{ width: FULL_WIDTH, height: ADS_MAX_HEIGHT }}>
      <Swiper
        key={state.items.length}
        showsButtons={false}
        loop={false}
        height={ADS_MAX_HEIGHT}
        width={FULL_WIDTH}
        dot={<Dot />}
				activeDot={<ActiveDot />}
				paginationStyle={{bottom: 10}}
      >
        {state.loading ? (
          <View style={loadingContainerStyles.container}>
            <ActivityIndicator
              style={tailwind('flex flex-row justify-center items-center')}
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

function AdsItem({ href, onPress }) {
  return (
    <View>
      <Image
        source={{ uri: href }}
        style={[{ width: FULL_WIDTH, height: ADS_MAX_HEIGHT, resizeMode: 'stretch' }]}
      />
    </View>
  );
}

const Dot = () => <View style={tailwind('w-2 h-2 m-1 bg-white bg-opacity-25 border border-white rounded-full')}></View>;
const ActiveDot = () => <View style={tailwind('w-2 h-2 m-1 bg-white rounded-full')}></View>;

const loadingContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default AdsPaginator;
