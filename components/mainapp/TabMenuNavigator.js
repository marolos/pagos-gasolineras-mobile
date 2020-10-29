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
      <View style={styles.bar.view}>
         <View style={styles.bar.line} />
         <View style={styles.bar.buttons}>
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
         style={styles.tabButton.ripple}
         rippleCentered={true}
         rippleSize={80}
         rippleDuration={300}
      >
         <View style={styles.tabButton.view}>
            <Icon focused={focused} />
            <Text
               style={[
                  { fontSize: 11 },
                  focused ? styles.tabButton.focused : styles.tabButton.notFocused,
                  typefaces.pm,
               ]}
            >
               {label}
            </Text>
         </View>
      </Ripple>
   );
});

const styles = {
   tabButton: {
      ripple: { paddingTop: 10 },
      view: tailwind('flex items-center'),
      focused: tailwind('text-black'),
      notFocused: tailwind('text-gray-500'),
   },
   bar: {
      view: { ...shadowStyle, backgroundColor: 'white' },
      line: [{ height: 2 }, tailwind('bg-gray-200')],
      buttons: tailwind('flex flex-row justify-evenly pb-1 pt-1'),
   },
};

export default TabMenuNavigator;
