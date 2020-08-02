import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import GasCompaniesView from './GasCompaniesView';
import SearchView from './SearchView';
import NotificationsView from './NotificationsView';
import { setActiveTab } from '../../redux/actions';
import { TabOptions } from '../../redux/reducers';

const Tab = createBottomTabNavigator();

function TabMenuNavigator(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
				name="gascompanies"
				component={GasCompaniesView}
				listeners={{
          tabPress: () => props.setActiveTab(TabOptions.GAS)
        }}
        options={() => ({
					tabBarIcon: (focused) => <Label label={'gas'} active={focused} />,
        })}
      />
      <Tab.Screen
        name="search"
        component={SearchView}
        listeners={{
          tabPress: () => props.setActiveTab(TabOptions.SEARCH)
        }}
        options={() => ({
          tabBarIcon: (focused) => <Label label={'search'} active={focused} />,
        })}
      />
      <Tab.Screen
        name="notifications"
				component={NotificationsView}
				listeners={{
          tabPress: () => props.setActiveTab(TabOptions.NOTIFICATIONS)
        }}
        options={() => ({
          tabBarIcon: (focused) => <Label label={'notifications'} active={focused} />,
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
const mapDispatchToProps = (dispatch) => ({
  setActiveTab: (activeTab) => dispatch(setActiveTab(activeTab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabMenuNavigator);
