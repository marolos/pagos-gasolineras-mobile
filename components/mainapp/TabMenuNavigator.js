import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import BalancesView from './BalancesView';
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
         <Tab.Screen name="balances" component={BalancesView} />
         <Tab.Screen name="search" component={SearchView} />
         <Tab.Screen name="notifications" component={NotificationsView} />
      </Tab.Navigator>
   );
}

function CustomTabBar(props) {
   return (
      <View style={{ ...shadowStyle, backgroundColor: 'white' }}>
         <View style={[{ height: 2 }, tailwind('bg-gray-200')]} />
         <View style={tailwind('flex flex-row justify-evenly pb-1 pt-1')}>
            <TabButtonGasStation navigation={props.navigation} />
            <TabButtonSearch navigation={props.navigation} />
            <TabButtonNotifications navigation={props.navigation} />
         </View>
      </View>
   );
}

const TabButtonGasStation = ({ navigation }) => {
   return (
      <TabButton
         navigateTo="balances"
         tabOption={TabOptions.GAS}
         label="Gasolineras"
         icon={DispenserIcon}
         navigation={navigation}
      />
   );
};

const TabButtonSearch = ({ navigation }) => {
   return (
      <TabButton
         navigateTo="search"
         tabOption={TabOptions.SEARCH}
         label="   Buscar   " // a bit hacky, sorry. It's to give space to the button and appreciate the ripple.
         icon={SearchIcon}
         navigation={navigation}
      />
   );
};

const TabButtonNotifications = ({ navigation }) => {
   return (
      <TabButton
         navigateTo="notifications"
         tabOption={TabOptions.NOTIFICATIONS}
         label="Notificaciones"
         icon={NotificationIcon}
         navigation={navigation}
      />
   );
};

const mapStateToProps = (state) => ({
   activeTab: state.activeTab,
});
const mapDispatchToProps = (dispatch) => ({
   setActiveTab: (activeTab) => dispatch(setActiveTab(activeTab)),
});

const TabButton = connect(
   mapStateToProps,
   mapDispatchToProps,
)(({ navigateTo, activeTab, setActiveTab, label, tabOption, icon, navigation }) => {
   const Icon = icon;
   const focused = activeTab.label === label.trim();
   return (
      <Ripple
         onPress={() => {
            navigation.navigate(navigateTo);
            setActiveTab(tabOption);
         }}
         style={{ paddingTop: 10 }}
         rippleCentered={true}
         rippleSize={80}
         rippleDuration={300}
      >
         <View style={tailwind('flex items-center')}>
            <Icon focused={focused} />
            <Text
               style={[
                  { fontSize: 11 },
                  focused ? tailwind('text-black') : tailwind('text-gray-500'),
                  typefaces.pm,
               ]}
            >
               {label}
            </Text>
         </View>
      </Ripple>
   );
});

export default TabMenuNavigator;
