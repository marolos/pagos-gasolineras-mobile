import React from 'react';
import 'react-native-gesture-handler';
import AuthFlowNavigator from './AuthFlowNavigator';
import { connect } from 'react-redux';
import { getGenericPassword, resetGenericPassword } from 'react-native-keychain';
import AppDrawerNavigator from './AppDrawerNavigator';
import Fetch from '../utils/Fetch';
import { unauthorizedInterceptor } from '../utils/interceptors';
import {requestUserPermission, manageMessages, manageBackground} from '../utils/firebase'

function App({ user, dispatch }) {
   requestUserPermission();
   React.useEffect(() => {
      getGenericPassword()
         .then((credentials) => {
				Fetch.setAuthToken(credentials.password);
				Fetch.addInterceptor(unauthorizedInterceptor(dispatch));
         })
         .catch((error) => {
				Fetch.removeAuthToken();
				Fetch.removeInterceptor('unauthorized')
            resetGenericPassword()
               .then(() => {})
               .catch((err) => {});
         });
   }, []);

   React.useEffect(() => {manageMessages()}, []);
   return user.loggedIn ? <AppDrawerNavigator /> : <AuthFlowNavigator />;
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);
