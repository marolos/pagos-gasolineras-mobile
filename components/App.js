import React from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './AppNavigator';
import AuthFlowNavigator from './AuthFlowNavigator';
import { Provider as ReduxProvider, connect } from 'react-redux';
import { getPersistor, getStore } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { View, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { getGenericPassword, resetGenericPassword } from 'react-native-keychain';
import FetchClient from '../utils/FetchClient';

function App() {
  React.useEffect(() => {
    getGenericPassword()
      .then((credentials) => {
        FetchClient.setAuthToken(credentials.password);
        SplashScreen.hide();
      })
      .catch((error) => {
        FetchClient.setAuthToken('');
        SplashScreen.hide();
        resetGenericPassword()
          .then((done) => {})
          .catch((err) => {});
      });
  }, []);

  return (
    <ReduxProvider store={getStore()}>
      <PersistGate persistor={getPersistor()} loading={<Loading />}>
        <AppWrap />
      </PersistGate>
    </ReduxProvider>
  );
}

const mapStateToProps = (state) => ({ user: state.user });

const AppWrap = connect(mapStateToProps)((props) => {
  return props.user.loggedIn ? <AppNavigator /> : <AuthFlowNavigator />;
});

const Loading = () => (
  <View>
    <ActivityIndicator/>
  </View>
);

export default App;
