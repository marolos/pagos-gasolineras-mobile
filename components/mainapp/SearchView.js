import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { FULL_WIDTH } from '../utils/constants';

function SearchView(props) {
   const [loaded, setLoaded] = React.useState(false);

   React.useEffect(() => {
      setTimeout(() => setLoaded(true), 100);
	}, []);
	
   return (
      <View>
         <Text>search</Text>
         {loaded && (
            <View style={{ height: 400, width: FULL_WIDTH }}>
               <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{ ...StyleSheet.absoluteFillObject }}
                  initialRegion={{
                     latitude: 37.78825,
                     longitude: -122.4324,
                     latitudeDelta: 0.0922,
                     longitudeDelta: 0.0421,
                  }}
               />
            </View>
         )}
      </View>
   );
}

export default SearchView;
