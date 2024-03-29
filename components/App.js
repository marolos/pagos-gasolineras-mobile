import React from 'react';
import 'react-native-gesture-handler';
import AuthFlowNavigator from './AuthFlowNavigator';
import { connect } from 'react-redux';
import { getGenericPassword, resetGenericPassword } from 'react-native-keychain';
import AppDrawerNavigator from './AppDrawerNavigator';
import Fetch from './utils/Fetch';
import { unauthorizedInterceptor } from './utils/interceptors';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'react-native';
import { initFirebase } from './notification/firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { theme, doDirtyShit } from './utils/constants';

enableScreens();
initFirebase();
doDirtyShit();

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
			<StatusBar hidden={false} backgroundColor="black" />
			<NavigationContainer theme={theme}>
				{user.loggedIn ? <AppDrawerNavigator /> : <AuthFlowNavigator />}
			</NavigationContainer>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);
