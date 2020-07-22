import React from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './AppNavigator';
import AuthFlowNavigator from './AuthFlowNavigator';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { getGenericPassword, resetGenericPassword } from 'react-native-keychain';
import FetchClient from '../utils/FetchClient';

function App(props) {
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
    props.user.loggedIn ? <AppNavigator /> : <AuthFlowNavigator />
  );
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);
