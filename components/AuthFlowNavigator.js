import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import LoginView from './auth/LoginView';
import SignupView from './auth/SignupView';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

function AuthFlowNavigator(props) {
   React.useEffect(() => {
      SplashScreen.hide();
   }, []);
   return (
      <NavigationContainer>
         <Stack.Navigator
            screenOptions={{ cardStyle: { backgroundColor: 'white' }, headerShown: false }}
         >
            <Stack.Screen name="login" component={LoginView} />
            <Stack.Screen name="signup" component={SignupView} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default AuthFlowNavigator;
