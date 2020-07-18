import React from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './AppNavigator';
import AuthFlowNavigator from './AuthFlowNavigator';
import { Provider as ReduxProvider } from 'react-redux';
import { getPersistor, getStore, getState } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AxiosClient from '../common/axiosClient';
import { getGenericPassword, resetGenericPassword } from 'react-native-keychain';

function App() {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      getGenericPassword()
        .then((credentials) => {
          AxiosClient.setAuthToken(credentials.password);
          setLoaded(true);
        })
        .catch((error) => {
          AxiosClient.setAuthToken('');
          setLoaded(true);
          resetGenericPassword()
            .then((done) => {})
            .catch((err) => {});
        });
      SplashScreen.hide();
      console.log('state:', getState().user);
    }, 4000);
  }, []);

  return (
    <ReduxProvider store={getStore()}>
      <PersistGate persistor={getPersistor()} loading={<Loading />}>
        {getState().user.loggedIn ? <AppNavigator /> : <AuthFlowNavigator />}
      </PersistGate>
    </ReduxProvider>
  );
}

const Loading = () => (
  <View>
    <Text>Loading ...</Text>
  </View>
);

export default App;
