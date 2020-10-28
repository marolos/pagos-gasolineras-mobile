import React from 'react';
import { AppRegistry, View, ActivityIndicator, Alert } from 'react-native';
import App from './components/App';
import { name as appName } from './app.json';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { getStore, getPersistor } from './redux/store';
import messaging from '@react-native-firebase/messaging';


const Loading = () => (
  <View>
    <ActivityIndicator />
  </View>
)


const AppWrapper = () => (
  <ReduxProvider store={getStore()}>
    <PersistGate persistor={getPersistor()} loading={<Loading />}>
      <App />
    </PersistGate>
  </ReduxProvider>
);

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.data));
});

AppRegistry.registerComponent(appName, ()=> AppWrapper);
