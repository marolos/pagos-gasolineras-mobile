import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from './auth/LoginView';
import SignupView from './auth/SignupView';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

function AuthFlowNavigator(props) {
   React.useEffect(() => {
      SplashScreen.hide();
   }, []);
   return (
      <Stack.Navigator
         screenOptions={{ cardStyle: { backgroundColor: 'white' }, headerShown: false }}
      >
         <Stack.Screen name="login" component={LoginView} />
         <Stack.Screen name="signup" component={SignupView} />
      </Stack.Navigator>
   );
}

export default AuthFlowNavigator;
