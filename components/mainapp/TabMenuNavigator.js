import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
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
import Ripple from 'react-native-material-ripple';
import { typefaces, shadowStyle } from '../../utils/styles';

const Tab = createBottomTabNavigator();

function TabMenuNavigator(props) {
   return (
      <Tab.Navigator tabBar={CustomTabBar}>
         <Tab.Screen name="gascompanies" component={GasCompaniesView} />
         <Tab.Screen name="search" component={SearchView} />
         <Tab.Screen name="notifications" component={NotificationsView} />
      </Tab.Navigator>
   );
}

function CustomTabBar(props) {
   return (
      <View style={{...shadowStyle, backgroundColor: 'white'}}>
         <View style={[{ height: 2 }, tailwind('bg-gray-200')]}></View>
         <View style={tailwind('flex flex-row justify-center pb-1 pt-1')}>
            <TabButtonGasStation navigation={props.navigation} />
            <TabButtonSearch navigation={props.navigation} />
            <TabButtonNotifications navigation={props.navigation} />
         </View>
      </View>
   );
}

const mapStateToProps = (state) => ({
   activeTab: state.activeTab,
});
const mapDispatchToProps = (dispatch) => ({
   setActiveTab: (activeTab) => dispatch(setActiveTab(activeTab)),
});

const TabButtonGasStation = connect(
   mapStateToProps,
   mapDispatchToProps,
)(({ activeTab, setActiveTab, navigation }) => {
   const focused = activeTab.label === TabOptions.GAS.label;
   return (
      <Ripple
         onPress={() => {
            navigation.navigate('gascompanies');
            setActiveTab(TabOptions.GAS);
         }}
         style={{ paddingTop: 10 }}
         rippleCentered={true}
         rippleSize={80}
         rippleDuration={300}
      >
         <View style={tailwind('flex items-center')}>
            <DispenserIcon focused={focused} />
            <Text
               style={[
                  tailwind('text-xs'),
                  focused ? tailwind('text-black') : tailwind('text-gray-500'),
                  typefaces.pm,
               ]}
            >
               Gasolineras
            </Text>
         </View>
      </Ripple>
   );
});

const TabButtonSearch = connect(
   mapStateToProps,
   mapDispatchToProps,
)(({ activeTab, setActiveTab, navigation }) => {
   const focused = activeTab.label === TabOptions.SEARCH.label;
   return (
      <Ripple
         onPress={() => {
            navigation.navigate('search');
            setActiveTab(TabOptions.SEARCH);
         }}
         style={{ marginLeft: 15, marginRight: 5, paddingTop: 10, paddingHorizontal: 10 }}
         rippleCentered={true}
         rippleSize={80}
         rippleDuration={300}
      >
         <View style={tailwind('flex items-center')}>
            <SearchIcon focused={focused} />
            <Text
               style={[
                  tailwind('text-xs'),
                  focused ? tailwind('text-black') : tailwind('text-gray-500'),
                  typefaces.pm,
               ]}
            >
               Buscar
            </Text>
         </View>
      </Ripple>
   );
});

const TabButtonNotifications = connect(
   mapStateToProps,
   mapDispatchToProps,
)(({ activeTab, setActiveTab, navigation }) => {
   const focused = activeTab.label === TabOptions.NOTIFICATIONS.label;
   return (
      <Ripple
         onPress={() => {
            navigation.navigate('notifications');
            setActiveTab(TabOptions.NOTIFICATIONS);
         }}
         style={{ paddingTop: 10 }}
         rippleCentered={true}
         rippleSize={80}
         rippleDuration={300}
      >
         <View style={tailwind('flex items-center')}>
            <NotificationIcon focused={focused} />
            <Text
               style={[
                  tailwind('text-xs'),
                  focused ? tailwind('text-black') : tailwind('text-gray-500'),
                  typefaces.pm,
               ]}
            >
               Notificaciones
            </Text>
         </View>
      </Ripple>
   );
});

export default TabMenuNavigator;
