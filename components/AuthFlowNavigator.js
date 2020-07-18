import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import LoginView from './auth/LoginView';
import SignupView from './auth/SignupView';

const Stack = createStackNavigator();

function AuthFlowNavigator(props) {
  return (
    <NavigationContainer>
      <StatusBar hidden={false} backgroundColor="black" />
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginView}
        />
        <Stack.Screen
          name="signup"
          component={SignupView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthFlowNavigator;
