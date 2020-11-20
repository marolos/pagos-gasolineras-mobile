import React from 'react';
import { View } from 'react-native';
import { FULL_HIGHT, FULL_WIDTH, MAPBOX_TOKEN, MAP_CENTER } from '../utils/constants';
import MapboxGL from '@react-native-mapbox-gl/maps';
import SearchBox from './SearchBox';
import CollapseSelectedStation from './CollapseSelectedStation';
import Fetch from '../utils/Fetch';
import SimpleToast from 'react-native-simple-toast';
import pointImg from '../../assets/icons/point.png';

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
         updateCount: 0,
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
      if (this.state.updateCount <= 2) {
         const newLocation = [location.coords.longitude, location.coords.latitude];
         this.setState((state) => ({
            userLocation: newLocation,
            center: newLocation,
            updateCount: state.updateCount + 1,
         }));
      }
   };

   onSelectPointer = (station, event) => {
      this.setState({
         selectedStation: station,
         center: [station.longitude, station.latitude],
         showCollapse: true,
      });
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
      } else {
         SimpleToast.showWithGravity(
            'Necesita proveer permisos de geolocalización',
            500,
            SimpleToast.CENTER,
         );
      }
   };

   onSelectStationResult = (station) => {
      this.setState({
         selectedStation: station,
         pointers: [station],
         zoom: 14,
         center: [station.longitude, station.latitude],
         showCollapse: true,
      });
   };

   render() {
      const { center, zoom, showLocation, pointers, selectedStation, showCollapse } = this.state;
      return (
         <View>
            <SearchBox
               onSelectStation={this.onSelectStationResult}
               onSearchNear={this.onSearchNear}
            />
            <View style={styles.map.view}>
               {this.state.loaded && (
                  <MapboxGL.MapView style={styles.map.map} rotateEnabled={false}>
                     <MapboxGL.Camera centerCoordinate={center} zoomLevel={zoom} />
                     {showLocation && (
                        <MapboxGL.UserLocation onUpdate={this.updateUserLocation} animated />
                     )}
                     {pointers.map((station) => (
                        <Pointer
                           key={station.id}
                           id={station.id}
                           coord={[station.longitude, station.latitude]}
                           onPress={(event) => this.onSelectPointer(station, event)}
                           label={station.name}
                        />
                     ))}
                  </MapboxGL.MapView>
               )}
            </View>
            {selectedStation && (
               <CollapseSelectedStation
                  visible={showCollapse}
                  closeCollapse={() => this.setState({ showCollapse: false })}
                  station={selectedStation}
                  navigation={this.props.navigation}
               />
            )}
         </View>
      );
   }
}

function Pointer({ id, coord, label, onPress }) {
   return (
      <MapboxGL.ShapeSource
         id={id.toString()}
         hitbox={{ width: 20, height: 20 }}
         onPress={onPress}
         shape={getShape(id, coord)}
      >
         <MapboxGL.SymbolLayer id={'icon' + id.toString()} style={styles.iconLayer} />
         <MapboxGL.SymbolLayer id={'text' + id.toString()} style={getTextStyle(label)} />
      </MapboxGL.ShapeSource>
   );
}

function getShape(id, coord) {
   return {
      id: id.toString(),
      type: 'Feature',
      geometry: {
         type: 'Point',
         coordinates: coord,
      },
   };
}

function getTextStyle(label) {
   return {
      textField: label,
      textAllowOverlap: false,
      textIgnorePlacement: true,
      textTranslate: [18, -15],
      textSize: 13,
      textColor: '#222',
      textMaxWidth: 20,
      textAnchor: 'left',
   };
}

const styles = {
   map: {
      view: { height: FULL_HIGHT - 50, width: FULL_WIDTH },
      map: { flex: 1 },
   },
   iconLayer: { iconImage: pointImg, iconSize: 0.7, iconTranslate: [0, -10] },
};

export default SearchView;
