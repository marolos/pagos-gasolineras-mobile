import messaging from '@react-native-firebase/messaging';
import {Platform, Alert} from 'react-native'

const message = messaging();

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
   const token = await message.getToken();
   return {
      token: token,
      os: os
   }
}

export function manageMessages(){
  /*  message.getInitialNotification()
      .then(remoteMessage => {
        console.log('Message handled in the getInitialNotification!', remoteMessage.data);
        if (response) Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.data));
      });
   message.onNotificationOpenedApp(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.data));
   }); */
   const unsubscribe = message.onMessage(async remoteMessage => {
      Alert.alert(remoteMessage.data.type, JSON.stringify(remoteMessage.data));
    });
   return unsubscribe;

}
