import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

function AppTabMenu(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={() => (
          <View>
            <Text>home</Text>
          </View>
        )}
      />
      <Tab.Screen
        name="search"
        component={() => (
          <View>
            <Text>search</Text>
          </View>
        )}
      />
      <Tab.Screen
        name="notifications"
        component={() => (
          <View>
            <Text>notifications</Text>
          </View>
        )}
      />
    </Tab.Navigator>
  );
}

export default AppTabMenu;
