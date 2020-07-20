import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar, View, Text } from 'react-native';
import AppTabMenu from './AppTabMenu';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function AppNavigator(props) {
  return (
    <NavigationContainer>
      <StatusBar hidden={false} backgroundColor="black" />
      <Drawer.Navigator>
        <Drawer.Screen
          name="TabMenu"
          component={AppTabMenu}
          options={{
            drawerLabel: () => null,
          }}
        />
        <Drawer.Screen
          name="profile"
          component={() => (
            <View>
              <Text>payment</Text>
            </View>
          )}
        />
        <Drawer.Screen
          name="payment"
          component={() => (
            <View>
              <Text>payment</Text>
            </View>
          )}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
