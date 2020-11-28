import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import BalancesView from './BalancesView';
import { TabOptions } from '../redux/reducers';
import tailwind from 'tailwind-rn';
import DispenserIcon from '../icons/DispenserIcon';
import SearchIcon from '../icons/SearchIcon';
import NotificationIcon from '../icons/NotificationIcon';
import Ripple from 'react-native-material-ripple';
import { typefaces, shadowStyle } from '../utils/styles';
import SearchView from '../search/SearchView';
import NotificationsView from '../notification/NotificationsView';
import { getMessaging } from '../notification/firebaseConfig';

const Tab = createBottomTabNavigator();

function TabMenuNavigator({ navigation }) {
	const dispatch = useDispatch();

	React.useEffect(() => {
		getMessaging().onNotificationOpenedApp((message) => {
			navigation.navigate('tabMenu', { screen: 'notifications', params: message });
		});
		getMessaging()
			.getInitialNotification()
			.then((message) => {
				if (message) {
					navigation.navigate('tabMenu', { screen: 'notifications', params: message });
				}
			});
		getMessaging().onMessage((message) => {
			dispatch({ type: 'ARRIVED_NEW' });
		});
	}, []);

	return (
		<Tab.Navigator tabBar={CustomTabBar}>
			<Tab.Screen name="balances" component={BalancesView} />
			<Tab.Screen name="search" component={SearchView} />
			<Tab.Screen name="notifications" component={NotificationsView} />
		</Tab.Navigator>
	);
}

const CustomTabBar = ({ navigation }) => <CustomTabBarMemoized navigation={navigation} />;

const CustomTabBarMemoized = memo(({ navigation }) => {
	return (
		<View style={styles.bar.view}>
			<View style={styles.bar.line} />
			<View style={styles.bar.buttons}>
				<TabButton
					navigateTo="balances"
					tabOption={TabOptions.GAS}
					label="Gasolineras"
					icon={DispenserIcon}
					navigation={navigation}
				/>
				<TabButton
					navigateTo="search"
					tabOption={TabOptions.SEARCH}
					label="   Buscar   " // a bit hacky, sorry. It's to give space to the button and appreciate the ripple.
					icon={SearchIcon}
					navigation={navigation}
				/>
				<TabButtonBadger
					navigateTo="notifications"
					tabOption={TabOptions.NOTIFICATIONS}
					label="Notificaciones"
					icon={NotificationIcon}
					navigation={navigation}
				/>
			</View>
		</View>
	);
});

const TabButtonBase = memo(({ navigateTo, activeTab, tabOption, label, icon, navigation }) => {
	const Icon = icon;
	const focused = activeTab.label === tabOption.label;
	return (
		<Ripple
			onPress={() => {
				navigation.navigate(navigateTo);
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

const TabButton = connect((state) => ({ activeTab: state.activeTab }))(TabButtonBase);

const TabButtonBadger = connect(({ activeTab, newNotification }) => ({
	activeTab,
	newNotification,
}))((props) => {
	return (
		<View style={styles.badge.view}>
			{props.newNotification && <View style={styles.badge.circle} />}
			<TabButtonBase {...props} />
		</View>
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
	badge: {
		view: { position: 'relative' },
		circle: [
			tailwind('absolute rounded-full bg-pink-500'),
			{ right: 8, top: 4, width: 10, height: 10 },
		],
	},
};

export default TabMenuNavigator;
