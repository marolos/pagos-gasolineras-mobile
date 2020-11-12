import React from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native';
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { FULL_HIGHT, FULL_WIDTH, MAPBOX_TOKEN, MAP_CENTER } from '../utils/constants';
import MapboxGL from '@react-native-mapbox-gl/maps';
import tailwind from 'tailwind-rn';
import { shadowStyle, shadowStyle2 } from '../utils/styles';
import SearchIcon from '../icons/SearchIcon';
import Animated, { Easing } from 'react-native-reanimated';

MapboxGL.setAccessToken(MAPBOX_TOKEN);

class SearchView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loaded: false,
         perm: false,
      };
   }
   componentDidMount() {
      MapboxGL.setTelemetryEnabled(false);
      setTimeout(() => {
         this.setState({ loaded: true });
         MapboxGL.requestAndroidLocationPermissions()
            .then((acepted) => this.setState({ perm: acepted }))
            .catch((err) => this.setState({ perm: false }));
      }, 90);
   }

   render() {
      return (
         <View>
            <SearchBox />
            {this.state.loaded && (
               <View style={styles.map.view}>
                  <MapboxGL.MapView style={styles.map.map} rotateEnabled={false}>
                     <MapboxGL.Camera centerCoordinate={MAP_CENTER} zoomLevel={12} />
                     {
                        <MapboxGL.PointAnnotation
                           id={'1'}
                           coordinate={MAP_CENTER}
                           selected
                           title="nope"
                        />
                     }
                  </MapboxGL.MapView>

                  {/* <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{ ...StyleSheet.absoluteFillObject }}
                  initialRegion={{
                     latitude: 37.78825,
                     longitude: -122.4324,
                     latitudeDelta: 0.0922,
                     longitudeDelta: 0.0421,
                  }}
               /> */}
               </View>
            )}
         </View>
      );
   }
}

class SearchBox extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         open: false,
      };
   }

   componentDidMount() {
      Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
   }

   componentWillUnmount() {
      Keyboard.removeListener('keyboardDidShow', this.keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', this.keyboardDidHide);
   }

   keyboardDidShow = () => {
      this.setState({ open: true });
   };

   keyboardDidHide = () => {
      this.setState({ open: false });
   };

   render() {
      return (
         <View style={styles.search.view}>
            <View style={styles.search.box}>
               <TextInput placeholder="nombre, dirección." style={tailwind('w-4/5')} />
               <SearchIcon />
            </View>
            <AnimatedBackground show={this.state.open} />
         </View>
      );
   }
}

function AnimatedBackground({ show }) {
   const [value, setValue] = React.useState(new Animated.Value(0));

   React.useEffect(() => {
      Animated.timing(value, {
         toValue: show ? FULL_HIGHT : 0,
         duration: 250,
         easing: Easing.circle,
      }).start();
   }, [show]);

   return (
      <Animated.View style={[styles.search.bg, { height: value, width: value }]}></Animated.View>
   );
}

const styles = {
   map: {
      view: { height: FULL_HIGHT - 50, width: FULL_WIDTH },
      map: { flex: 1 },
   },
   search: {
      view: [
         { position: 'absolute', zIndex: 20, top: 20, left: 20 },
         tailwind('flex justify-center items-center'),
      ],
      box: [
         tailwind('flex flex-row items-center justify-evenly bg-white px-2 rounded-md'),
         shadowStyle2,
         { width: FULL_WIDTH - 40 },
      ],
      bg: { position: 'absolute', backgroundColor: 'white', top: -20, ...tailwind('rounded-b-full') },
   },
};

export default SearchView;
