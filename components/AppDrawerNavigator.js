import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProfileView from './profile/ProfileView';
import PaymentMethodsView from './payment/PaymentMethodsView';
import HomeNavigator from './HomeNavigator';

const Drawer = createDrawerNavigator();

function AppDrawerNavigator(props) {
  return (
    <NavigationContainer>
      <StatusBar hidden={false} backgroundColor="black" />
      <Drawer.Navigator>
        <Drawer.Screen
          name="home"
          component={HomeNavigator}
          options={{ drawerLabel: () => null }}
        />
        <Drawer.Screen name="profile" component={ProfileView} />
        <Drawer.Screen name="payment" component={PaymentMethodsView} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppDrawerNavigator;
