import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import GasCompaniesView from './GasCompaniesView';
import SearchView from './SearchView';
import NotificationsView from './NotificationsView';
import { setActiveTab } from '../../redux/actions';
import { TabOptions } from '../../redux/reducers';
import tailwind from 'tailwind-rn';
import DispenserIcon from '../icons/DispenserIcon';
import SearchIcon from '../icons/SearchIcon';
import NotificationIcon from '../icons/NotificationIcon';
import { typefaces } from '../../utils/styles';

const Tab = createBottomTabNavigator();

function TabMenuNavigator(props) {
  return (
    <Tab.Navigator
      tabBarOptions={{ style: [tailwind('px-12'), { height: 60 }], showLabel: true }}
    >
      <Tab.Screen
        name="gascompanies"
        component={GasCompaniesView}
        listeners={{
          tabPress: () => props.setActiveTab(TabOptions.GAS),
        }}
        options={() => ({
          tabBarIcon: ({ focused }) => <DispenserIcon focused={focused} />,
          tabBarLabel: ({ focused }) => (
            <Label focused={focused} text={TabOptions.GAS.label} />
          ),
        })}
      />
      <Tab.Screen
        name="search"
        component={SearchView}
        listeners={{
          tabPress: () => props.setActiveTab(TabOptions.SEARCH),
        }}
        options={() => ({
          tabBarIcon: ({ focused }) => <SearchIcon focused={focused} />,
          tabBarLabel: ({ focused }) => (
            <Label focused={focused} text={TabOptions.SEARCH.label} />
          ),
        })}
      />
      <Tab.Screen
        name="notifications"
        component={NotificationsView}
        listeners={{
          tabPress: () => props.setActiveTab(TabOptions.NOTIFICATIONS),
        }}
        options={() => ({
          tabBarIcon: ({ focused }) => <NotificationIcon focused={focused} />,
          tabBarLabel: ({ focused }) => (
            <Label focused={focused} text={TabOptions.NOTIFICATIONS.label} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

const Label = ({ focused, text }) =>
  focused ? <Text style={[tailwind('text-black text-xs'), typefaces.pm]}>{text}</Text> : null;

const mapStateToProps = (state) => ({
  activeTab: state.activeTab,
});
const mapDispatchToProps = (dispatch) => ({
  setActiveTab: (activeTab) => dispatch(setActiveTab(activeTab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabMenuNavigator);
