import React from 'react';
import { AppRegistry, View, ActivityIndicator } from 'react-native';
import App from './components/App';
import { name as appName } from './app.json';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { getPersistor, getStore } from './components/redux/store';


const Loading = () => (
   <View>
      <ActivityIndicator />
   </View>
);

const AppWrapper = () => (
   <ReduxProvider store={getStore()}>
      <PersistGate persistor={getPersistor()} loading={<Loading />}>
         <App />
      </PersistGate>
   </ReduxProvider>
);

AppRegistry.registerComponent(appName, () => AppWrapper);
