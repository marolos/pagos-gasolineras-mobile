import React, { memo } from 'react';
import { View } from 'react-native';
import { FULL_HIGHT, FULL_WIDTH, MAPBOX_TOKEN, MAP_CENTER } from '../utils/constants';
import MapboxGL from '@react-native-mapbox-gl/maps';
import SearchBox from './SearchBox';
import CollapseSelectedStation from './CollapseSelectedStation';
import Fetch from '../utils/Fetch';
import SimpleToast from 'react-native-simple-toast';
import pointImg from '../../assets/icons/point.png';
import { getMapboxRoute, sleep } from '../utils/utils';
import { connect } from 'react-redux';
import { TabOptions } from '../redux/reducers';
import { setActiveTab } from '../redux/actions';

MapboxGL.setAccessToken(MAPBOX_TOKEN);
MapboxGL.setTelemetryEnabled(false);

class SearchView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			perm: false,
			center: MAP_CENTER,
			zoom: 12,
			userLocation: MAP_CENTER,
			showLocation: false,
			showCollapse: false,
			pointers: [],
			selectedStation: null,
			showRoute: false,
			route: [],
		};
	}

	componentDidMount() {
		this.unsubscribeFocus = this.props.navigation.addListener('focus', () => {
			this.props.dispatch(setActiveTab(TabOptions.SEARCH));
		});
	}

	componentWillUnmount() {
		if (this.unsubscribeFocus) this.unsubscribeFocus();
	}

	loadRoute = (end) => {
		getMapboxRoute(this.state.userLocation, end)
			.then((routeResult) => {
				this.setState({ showRoute: true, route: routeResult });
			})
			.catch((err) => {
				console.error(err);
				this.setState({ showRoute: false });
			});
	};

	getUserLocation = async () => {
		try {
			const granted = await MapboxGL.requestAndroidLocationPermissions();
			this.setState({ showLocation: granted });
			await sleep(200);
			return granted;
		} catch (err) {
			console.error(err);
			return false;
		}
	};

	updateUserLocation = (location) => {
		const newLocation = [location.coords.longitude, location.coords.latitude];
		this.setState((state) => ({
			userLocation: newLocation,
		}));
	};

	onSelectPointer = (station, event) => {
		if (this.state.showLocation) {
			this.loadRoute([[station.longitude, station.latitude]]);
		}
		this.setState({
			selectedStation: station,
			center: [station.longitude, station.latitude - 0.005],
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
				this.setState({ center: [longitude, latitude] });
				const response = await Fetch.get('/company/search/gs/nearto/', { longitude, latitude });
				this.setState({
					pointers: response.body.result,
					zoom: 13,
					center: [longitude, latitude],
				});
			} catch (error) {
				this.setState({ pointers: [], center: this.state.userLocation });
			}
		} else {
			SimpleToast.showWithGravity(
				'Necesita proveer permisos de geolocalización',
				500,
				SimpleToast.CENTER,
			);
		}
	};

	onSelectResult = (station) => {
		this.setState({
			selectedStation: station,
			pointers: [station],
			zoom: 14,
			center: [station.longitude, station.latitude - 0.005],
			showCollapse: true,
		});
		if (this.state.showLocation) {
			this.loadRoute([[station.longitude, station.latitude]]);
		}
	};

	render() {
		const {
			center,
			zoom,
			showLocation,
			pointers,
			selectedStation,
			showCollapse,
			showRoute,
			route,
		} = this.state;
		return (
			<View>
				<SearchBox onSelectResult={this.onSelectResult} onSearchNear={this.onSearchNear} />
				<View style={styles.map.view}>
					<MapboxGL.MapView style={styles.map.map} rotateEnabled={false}>
						<MapboxGL.Camera centerCoordinate={center} zoomLevel={zoom} />
						{showLocation && (
							<MapboxGL.UserLocation onUpdate={this.updateUserLocation} animated />
						)}
						{showRoute && <RouteShape route={route} />}
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

function RouteShape({ route }) {
	return (
		<MapboxGL.ShapeSource id={'dirs'} shape={getRouteConf(route)}>
			<MapboxGL.LineLayer id={'linedir'} style={{ lineColor: '#0E7490', lineWidth: 3 }} />
		</MapboxGL.ShapeSource>
	);
}

function getRouteConf(route) {
	return {
		type: 'FeatureCollection',
		features: route.map((direction) => ({
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'LineString',
				coordinates: direction,
			},
		})),
	};
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
		textSize: 14,
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

export default connect()(SearchView);
