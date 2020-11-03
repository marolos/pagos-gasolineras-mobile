import React from 'react';
import 'react-native-gesture-handler';
import AuthFlowNavigator from './AuthFlowNavigator';
import { connect } from 'react-redux';
import { getGenericPassword, resetGenericPassword } from 'react-native-keychain';
import AppDrawerNavigator from './AppDrawerNavigator';
import Fetch from '../utils/Fetch';
import { unauthorizedInterceptor } from '../utils/interceptors';

function App({ user, dispatch }) {
   React.useEffect(() => {
      getGenericPassword()
         .then((credentials) => {
            Fetch.setAuthToken(credentials.password);
            Fetch.addInterceptor(unauthorizedInterceptor(dispatch));
         })
         .catch((error) => {
            Fetch.removeAuthToken();
            Fetch.removeInterceptor('unauthorized');
            resetGenericPassword()
               .then(() => {})
               .catch((err) => {
                  err;
               });
         });
   }, []);

   return (
      <React.Fragment>
         {user.loggedIn ? <AppDrawerNavigator /> : <AuthFlowNavigator />}
      </React.Fragment>
   );
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);
