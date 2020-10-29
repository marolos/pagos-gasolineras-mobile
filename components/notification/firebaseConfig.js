import { Alert, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Fetch from '../../utils/Fetch';

let MessagingApp = null;

export function initFirebase() {
   MessagingApp = getMessaging();
   MessagingApp.onMessage((message) => {
      Alert.alert(remoteMessage.data.type, JSON.stringify(remoteMessage.data));
   });
}

export function getMessaging() {
   if (!MessagingApp) {
      MessagingApp = messaging();
   }
   return MessagingApp;
}

//Request permission notifications for ios devices
export async function requestUserPermission() {
   const authStatus = await getMessaging().requestPermission();
   const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
   return enabled;
}

export async function getDeviceInfo() {
   const os = Platform.OS;
   const token = await getMessaging().getToken();
   const data = { os, token };
   console.log('datdatdatdtad::', data);
   /** Now SEND to server */
   Fetch.post('')
      .then((res) => {})
      .catch((err) => {});
}
