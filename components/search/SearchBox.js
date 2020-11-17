import React from 'react';
import { View, TextInput, Keyboard, ActivityIndicator, Text } from 'react-native';
import { FULL_HIGHT, FULL_WIDTH } from '../utils/constants';
import tailwind from 'tailwind-rn';
import { shadowStyle2, typefaces } from '../utils/styles';
import SearchIcon from '../icons/SearchIcon';
import Animated, { Easing } from 'react-native-reanimated';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Fetch from '../utils/Fetch';
import CloseIcon from '../icons/CloseIcon';
import Ripple from 'react-native-material-ripple';
import { ScrollView } from 'react-native-gesture-handler';
import ArrowUpLeftIcon from '../icons/ArrowUpLeftIcon';
import NavigationIcon from '../icons/NavigationIcon';
import MapPinIcon from '../icons/MapPinIcon';

class SearchBox extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         open: false,
         results: [],
      };
      this.searchDebounced = AwesomeDebouncePromise(
         (text) => Fetch.get('/company/search/gs/?q=' + text),
         350,
      );
   }

   componentDidMount() {
      Keyboard.addListener('keyboardDidShow', this.onKeyboardShow);
      Keyboard.addListener('keyboardDidHide', this.onKeyboardHide);
   }

   componentWillUnmount() {
      Keyboard.removeListener('keyboardDidShow', this.onKeyboardShow);
      Keyboard.removeListener('keyboardDidHide', this.onKeyboardHide);
   }

   onKeyboardShow = () => {
      this.setState({ open: true });
   };

   onKeyboardHide = () => {
      this.setState({ open: false });
   };

   onChangeText = (text) => {
      if (!text) {
         this.setState({ loading: false });
         return;
      }
      if (text.length < 3) return;

      this.setState({ loading: true });
      this.searchDebounced(text)
         .then((res) => {
            this.setState({ results: res.body.result, loading: false });
         })
         .catch((err) => {
            this.setState({ loading: false });
         });
   };

   getIcon = (loading, open) => {
      if (open) {
         return loading ? (
            <ActivityIndicator size="small" color="black" animating />
         ) : (
            <Ripple rippleCentered style={tailwind('p-2')} onPress={() => Keyboard.dismiss()}>
               <CloseIcon height={12} width={12} />
            </Ripple>
         );
      }
      return loading ? (
         <ActivityIndicator size="small" color="black" animating />
      ) : (
         <SearchIcon fill={'#777'} focused />
      );
   };

   selectStation = (station) => {
      Keyboard.dismiss()
      if (this.props.onSelectStation) {
         this.props.onSelectStation(station);
      }
   };

   onSearchNear = async () => {
      this.setState({ loading: true, open: false });
      Keyboard.dismiss();
      if (this.props.onSearchNear) {
         await this.props.onSearchNear();
         this.setState({ loading: false });
      }
   };

   render() {
      const { loading, open } = this.state;
      return (
         <View style={styles.view}>
            <ScrollView keyboardShouldPersistTaps="handled" style={styles.boxScrollView}>
               <View style={styles.box}>
                  <TextInput
                     style={tailwind('w-56')}
                     placeholder="nombre, dirección"
                     onChangeText={this.onChangeText}
                  />
                  {this.getIcon(loading, open)}
               </View>
            </ScrollView>
            {open && (
               <ResultList
                  results={this.state.results}
                  onPressItem={this.selectStation}
                  onSearchNear={this.onSearchNear}
               />
            )}
            <AnimatedBackground show={this.state.open} />
         </View>
      );
   }
}

function AnimatedBackground({ show }) {
   const [value] = React.useState(new Animated.Value(0));

   React.useEffect(() => {
      Animated.timing(value, {
         toValue: show ? FULL_HIGHT : 0,
         duration: 150,
         easing: Easing.circle,
      }).start();
   }, [show]);

   return <Animated.View style={[styles.bg, { height: value, width: value }]}></Animated.View>;
}

function ResultList({ results = [], onPressItem = () => {}, onSearchNear = () => {} }) {
   return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.resultList}>
         <SearchNearButton onPress={onSearchNear} />
         {results.map((station) => (
            <Ripple
               key={station.id}
               style={tailwind('flex flex-row items-center justify-between px-6 pt-1 pb-2')}
               onPress={() => onPressItem(station)}
            >
               <View style={tailwind('flex flex-row items-center')}>
                  <MapPinIcon />
                  <View style={tailwind('ml-3')}>
                     <Text style={[tailwind('text-sm'), typefaces.pm]}>{station.name}</Text>
                     <Text
                        style={[tailwind('text-sm text-gray-700'), { maxWidth: 200 }, typefaces.pr]}
                     >
                        {station.address}
                     </Text>
                  </View>
               </View>
               <ArrowUpLeftIcon />
            </Ripple>
         ))}
      </ScrollView>
   );
}

function SearchNearButton({ onPress }) {
   return (
      <Ripple onPress={onPress} style={tailwind('flex flex-row items-center mb-3 px-4 py-2')}>
         <View
            style={tailwind('flex rounded-full w-8 h-8 bg-gray-300 items-center justify-center')}
         >
            <NavigationIcon width={15} height={15} />
         </View>
         <Text style={[tailwind('ml-3 mt-2'), typefaces.pr]}>Cerca de mí</Text>
      </Ripple>
   );
}

const styles = {
   boxScrollView: { zIndex: 5 },
   view: [{ position: 'absolute', top: 10, left: 5 }, tailwind('flex items-center')],
   box: [
      tailwind('flex flex-row items-center justify-between bg-white px-6 rounded-md m-3'),
      shadowStyle2,
      { width: FULL_WIDTH - (24 + 10) },
   ],
   bg: {
      position: 'absolute',
      backgroundColor: 'white',
      top: -20,
      zIndex: 4,
      ...tailwind('rounded-b-full'),
   },
   resultList: [tailwind('absolute w-full'), { zIndex: 5, top: 85 }],
};

export default SearchBox;
