import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { TabOptions } from '../redux/reducers';

const Tab = createBottomTabNavigator();

function AppTabMenu({ activeTab }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={() => (
          <View>
            <Text>home</Text>
          </View>
        )}
        options={() => ({
          tabBarIcon: () => (
            <Label label={'home'} active={activeTab === TabOptions.HOME} />
          ),
        })}
      />
      <Tab.Screen
        name="search"
        component={() => (
          <View>
            <Text>search</Text>
          </View>
        )}
        options={() => ({
          tabBarIcon: () => (
            <Label label={'search'} active={activeTab === TabOptions.SEARCH} />
          ),
        })}
      />
      <Tab.Screen
        name="notifications"
        component={() => (
          <View>
            <Text>notifications</Text>
          </View>
        )}
        options={() => ({
          tabBarIcon: () => (
            <Label
              label={'notifications'}
              active={activeTab === TabOptions.NOTIFICATIONS}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

function Label({ label, active }) {
  return <Text style={{ color: active ? 'blue' : 'black' }}>{label}</Text>;
}

const mapStateToProps = (state) => ({
  activeTab: state.activeTab,
});

export default connect(mapStateToProps)(AppTabMenu);
