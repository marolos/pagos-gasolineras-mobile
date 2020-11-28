/**
	NOT ON USE.
	TODO: delete if not needed anymore
 */

// configureLocation()
//    .then((done) => {
//       if (done) {
//          requestPermission(this.updateLocation)
//             .then((subscription) => (this.locationSubscription = subscription))
//             .catch((err) => console.error(err));
//       }
//    })
//    .catch((err) => console.error(err));

//import RNLocation from 'react-native-location';
const RNLocation = {
	configure: () => {},
	requestPermission: () => {},
	subscribeToLocationUpdates: () => {},
};
async function configureLocation() {
	let done = false;
	try {
		await RNLocation.configure({
			distanceFilter: 100.0,
			androidProvider: 'auto',
		});
		done = true;
	} catch (err) {
		console.error('RNLocation', err);
	}
	return done;
}

async function requestPermission(onUpdateLocation) {
	const granted = await RNLocation.requestPermission({
		ios: 'whenInUse',
		android: {
			detail: 'coarse',
		},
	});
	if (granted) {
		const locationSubscription = RNLocation.subscribeToLocationUpdates((location) => {
			console.log(':::FFFFFF:', location);
			onUpdateLocation(location[0]);
		});
		return locationSubscription;
	}
	return null;
}
