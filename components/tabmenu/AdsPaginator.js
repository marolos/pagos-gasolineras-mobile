import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, ADS_MAX_HEIGHT } from '../../utils/constants';
import { fakeFetch } from '../../utils/mocks';

function AdsPaginator(props) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [actualIndex, setActualIndex] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    setLoading(true);
    fakeFetch().then((itemsMocks) => {
      setItems(itemsMocks);
      setTotal(itemsMocks.length);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {}, [items]);

  return (
    <View style={{ width: FULL_WIDTH, height: ADS_MAX_HEIGHT }}>
      <Swiper
        key={items.length}
        showsButtons={false}
        loop={false}
        height={ADS_MAX_HEIGHT}
        width={FULL_WIDTH}
        dot={<Dot />}
				activeDot={<ActiveDot />}
				paginationStyle={{bottom: 10}}
      >
        {loading ? (
          <View style={loadingContainerStyles.container}>
            <ActivityIndicator
              style={tailwind('flex flex-row justify-center items-center')}
              animating={loading}
              size="small"
              color="#000"
            />
          </View>
        ) : (
          items.map((item, index) => <AdsItem href={item.href} key={index} />)
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
