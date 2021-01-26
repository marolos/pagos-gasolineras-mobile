import React, { memo } from 'react';
import { View, TextInput, Keyboard, ActivityIndicator, Text } from 'react-native';
import { FULL_HIGHT, FULL_WIDTH } from '../utils/constants';
import tailwind from 'tailwind-rn';
import { shadowStyle2, typefaces } from '../utils/styles';
import SearchIcon from '../icons/SearchIcon2';
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
            <Ripple rippleCentered style={tailwind('p-2')} onPress={() => {
					this.textInput.clear();
					Keyboard.dismiss()
				}}>
               <CloseIcon height={14} width={14} />
            </Ripple>
         );
      }
      return loading ? (
         <ActivityIndicator size="small" color="black" animating />
      ) : (
			<Ripple rippleCentered style={tailwind('p-2')} onPress={() => {
				this.textInput.focus();
			}}>
				<SearchIcon fill={'#000'} height={20} width={20}/>

			</Ripple>
      );
   };

   selectResult = (station) => {
      Keyboard.dismiss();
      if (this.props.onSelectResult) {
         this.props.onSelectResult(station);
      }
   };

   onSearchNear = async () => {
		this.textInput.clear();
      this.setState({ loading: true, open: false });
      Keyboard.dismiss();
      if (this.props.onSearchNear) {
         await this.props.onSearchNear();
         this.setState({ loading: false });
      }
   };

   render() {
      const { loading, open, results } = this.state;
      return (
         <View style={styles.view}>
            <ScrollView keyboardShouldPersistTaps="handled" style={styles.boxScrollView}>
					<View style={tailwind('flex flex-row items-center')}>
						<View style={styles.box}>
							<TextInput
								ref={input => { this.textInput = input } }
								style={styles.textInput}
								placeholder="Nombre, dirección"
								onChangeText={this.onChangeText}
							/>
						</View>
						{this.getIcon(loading, open)}
					</View>
            </ScrollView>
            {open && (
               <ResultList
                  results={results}
                  onPressItem={this.selectResult}
                  onSearchNear={this.onSearchNear}
               />
            )}
            <AnimatedBackground show={open} />
         </View>
      );
   }
}

function AnimatedBackground({ show }) {
   const [value] = React.useState(new Animated.Value(0));

   React.useEffect(() => {
      Animated.timing(value, {
         toValue: show ? FULL_HIGHT : 0,
         duration: 200,
         easing: Easing.circle,
      }).start();
   }, [show]);

   return <Animated.View style={[styles.bg, { height: value, width: value }]} />;
}

function ResultList({ results = [], onPressItem = () => {}, onSearchNear = () => {} }) {
   return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.resultList.scroll}>
         <SearchNearButton onPress={onSearchNear} />
         {results.map((station) => (
            <Ripple
               key={station.id}
               style={styles.resultList.ripple}
               onPress={() => onPressItem(station)}
            >
               <View style={styles.resultList.view0}>
                  <MapPinIcon />
                  <View style={styles.resultList.view1}>
                     <Text style={styles.resultList.text0}>{station.name}</Text>
                     <Text style={styles.resultList.text1}>{station.address}</Text>
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
      <Ripple onPress={onPress} style={styles.nearButton.ripple}>
         <View style={styles.nearButton.view}>
            <NavigationIcon width={15} height={15} />
         </View>
         <Text style={styles.nearButton.text}>Cerca de mí</Text>
      </Ripple>
   );
}

const styles = {
   boxScrollView: { zIndex: 5 },
   view: [tailwind('flex items-center')],
   box: [
      tailwind('flex flex-row items-center bg-white px-6 border rounded-3xl m-3'),
      { width: FULL_WIDTH * 0.8 },
   ],
   bg: {
      position: 'absolute',
      backgroundColor: 'white',
      zIndex: 4,
      ...tailwind('rounded-b-full'),
	},
	textInput: tailwind('w-full'),
   resultList: {
      scroll: [tailwind('absolute w-full'), { zIndex: 5, top: 85 }],
      ripple: tailwind('flex flex-row items-center justify-between px-6 pt-1 pb-2'),
      view0: tailwind('flex flex-row items-center'),
      view1: tailwind('ml-3'),
      text0: [tailwind('text-sm'), typefaces.pm],
      text1: [tailwind('text-sm text-gray-700'), { maxWidth: 200 }, typefaces.pr],
   },
   nearButton: {
      ripple: tailwind('flex flex-row items-center mb-3 px-4 py-2 bg-white'),
      view: tailwind('flex rounded-full w-8 h-8 bg-gray-300 items-center justify-center'),
      text: [tailwind('ml-3 mt-2'), typefaces.pr],
   },
};

export default memo(SearchBox);
