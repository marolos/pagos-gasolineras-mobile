import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native'

//Request permission notifications for ios devices
export async function requestUserPermission() {
   const authStatus = await messaging().requestPermission();
   const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

   if (enabled) {
      console.log('Authorization status:', authStatus);
   }
}

export async function generateDeviceInfo(){
   const os = Platform.OS;
   const message = messaging();
   const token = await message.getToken();
   return {
      token: token,
      os: os
   }
}
