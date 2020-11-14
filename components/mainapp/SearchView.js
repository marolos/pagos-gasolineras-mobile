import React from 'react';
import { Button, View } from 'react-native';
import { FULL_HIGHT, FULL_WIDTH, MAPBOX_TOKEN, MAP_CENTER } from '../utils/constants';
import MapboxGL from '@react-native-mapbox-gl/maps';
import SearchBox from '../search/SearchBox';
import CollapseSelectedStation from '../search/CollapseSelectedStation';
import Fetch from '../utils/Fetch';

MapboxGL.setAccessToken(MAPBOX_TOKEN);
MapboxGL.setTelemetryEnabled(false);

class SearchView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loaded: false,
         perm: false,
         center: MAP_CENTER,
         zoom: 12,
         userLocation: MAP_CENTER,
         showLocation: false,
         showCollapse: false,
         pointers: [],
         selectedStation: null,
      };
   }

   componentDidMount() {
      setTimeout(() => {
         this.setState({ loaded: true });
      }, 90);
   }

   getUserLocation = async () => {
      try {
         const granted = await MapboxGL.requestAndroidLocationPermissions();
         if (granted) {
            this.setState({ showLocation: granted });
         }
         return granted;
      } catch (err) {
         console.error(err);
         return false;
      }
   };

   updateUserLocation = (location) => {
      const newLocation = [location.coords.longitude, location.coords.latitude];
      this.setState({ userLocation: newLocation, center: newLocation });
   };

   onSelectPointer = (station, feature) => {
      this.selectStation(station);
   };

   selectStation = (station) => {
      this.setState({ selectedStation: station, showCollapse: true });
   };

   onSearchNear = async () => {
      const granted = await this.getUserLocation();
      if (granted) {
         try {
            const {
               userLocation: [longitude, latitude],
            } = this.state;
            const response = await Fetch.get('/company/search/gs/nearto/', { longitude, latitude });
            this.setState({ pointers: response.body.result, zoom: 13 });
         } catch (error) {
            this.setState({ pointers: [] });
         }
      }
   };

   render() {
      const { center, zoom, showLocation, pointers } = this.state;
      return (
         <View>
            <SearchBox onSelectStation={this.selectStation} onSearchNear={this.onSearchNear} />
            {this.state.loaded && (
               <View style={styles.map.view}>
                  <MapboxGL.MapView style={styles.map.map} rotateEnabled={false}>
                     <MapboxGL.Camera centerCoordinate={center} zoomLevel={zoom} />
                     {showLocation && (
                        <MapboxGL.UserLocation onUpdate={this.updateUserLocation} animated />
                     )}
                     {pointers.map((station) => (
                        <MapboxGL.PointAnnotation
                           id={station.id + ''}
                           key={station.id}
                           coordinate={[station.longitude, station.latitude]}
                           selected={false}
                           title={station.name}
                           onSelected={(feature) => this.onSelectPointer(station, feature)}
                        />
                     ))}
                  </MapboxGL.MapView>
               </View>
            )}
            {this.state.selectedStation && (
               <CollapseSelectedStation
                  visible={this.state.showCollapse}
                  closeCollapse={() => this.setState({ showCollapse: false })}
                  station={this.state.selectedStation}
               />
            )}
         </View>
      );
   }
}

const styles = {
   map: {
      view: { height: FULL_HIGHT - 50, width: FULL_WIDTH },
      map: { flex: 1 },
   },
};

export default SearchView;
