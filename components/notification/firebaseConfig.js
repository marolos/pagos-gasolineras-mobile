import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Fetch from '../utils/Fetch';

let MessagingApp = null;

export function initFirebase() {
	MessagingApp = getMessaging();
	MessagingApp.setBackgroundMessageHandler(async (message) => {
		console.log('background', message.data);
	});
}

export function getMessaging() {
	if (!MessagingApp) {
		MessagingApp = messaging();
	}
	return MessagingApp;
}

// Request permission notifications for ios devices
export async function requestUserPermission() {
	const authStatus = await getMessaging().requestPermission();
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL;
	return enabled;
}

export async function getDeviceInfo() {
	const os = Platform.OS;
	let token = null;
	try {
		token = await getMessaging().getToken();
	} catch (err) {
		console.error(err);
		return;
	}
	if (!token) return;
	const device_info = { os, token };

	Fetch.post('/notification/user/token/', { device_info })
		.then((res) => {})
		.catch((err) => {
			console.error(err);
			Fetch.post('/notification/user/token/', { device_info })
				.then((res) => {
					res;
				})
				.catch((_err) => {
					console.error(_err);
				});
		});
}
