import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import LoginView from './auth/LoginView';
import SignupView from './auth/SignupView';
import SplashScreen from 'react-native-splash-screen';
import { typefaces } from '../utils/styles';
import tailwind from 'tailwind-rn';

const Stack = createStackNavigator();

function AuthFlowNavigator(props) {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar hidden={false} backgroundColor='black' />
      <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' } }}>
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
          component={LoginView}
        />
        <Stack.Screen
          name="signup"
          options={{
						headerTitle: 'Registrarse',
						headerTitleStyle: [tailwind('text-base mt-2'), typefaces.pm] 
          }}
          component={SignupView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthFlowNavigator;
