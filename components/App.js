import React from 'react';
import 'react-native-gesture-handler';
import AuthFlowNavigator from './AuthFlowNavigator';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { getGenericPassword, resetGenericPassword } from 'react-native-keychain';
import FetchClient from '../utils/FetchClient';
import AppDrawerNavigator from './AppDrawerNavigator';

function App(props) {
  React.useEffect(() => {
    getGenericPassword()
      .then((credentials) => {
        FetchClient.setAuthToken(credentials.password);
      })
      .catch((error) => {
        FetchClient.setAuthToken('');
        resetGenericPassword()
          .then(() => {})
          .catch((err) => {});
      })
      .finally(() => {
        SplashScreen.hide();
      });
  }, []);

  return props.user.loggedIn ? <AppDrawerNavigator /> : <AuthFlowNavigator />;
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);
