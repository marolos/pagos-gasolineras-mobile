import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { connect } from 'react-redux';
import BalancesView from './BalancesView';
import tailwind from 'tailwind-rn';
import DispenserIcon from '../icons/DispenserIcon';
import SearchIcon from '../icons/SearchIcon2';
import ProfileIcon from '../icons/ProfileIcon2';
import TipsIcon from '../icons/TipsIcon';
import Ripple from 'react-native-material-ripple';
import {  shadowStyle } from '../utils/styles';
import SearchView from '../search/SearchView';
import TipsView from '../tips/TipsView';
import NotificationsView from '../notification/NotificationsView';
import ProfileNavigator from '../profile/ProfileNavigator';
import { getMessaging } from '../notification/firebaseConfig';
import { TabOptions } from '../redux/ui/reducers';
import ProfileView, { ProfileViewFromTabMenu } from '../profile/ProfileView';

const Tab = createBottomTabNavigator();

function TabMenuNavigator({ navigation }) {
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
	}, []);

	return (
		<Tab.Navigator tabBar={CustomTabBar}>
			<Tab.Screen name="balances" component={BalancesView} />
			<Tab.Screen name="search" component={SearchView} />
			<Tab.Screen name="tips" component={TipsView} />
			<Tab.Screen name="profile" component={ProfileViewFromTabMenu} />
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
					//label="Gasolineras"
					icon={DispenserIcon}
					navigation={navigation}
				/>
				<TabButton
					navigateTo="search"
					tabOption={TabOptions.SEARCH}
					//label="               " // a bit hacky, sorry. It's to give space to the button and appreciate the ripple effect.
					icon={SearchIcon}
					navigation={navigation}
				/>
				<TabButton
					navigateTo="tips"
					tabOption={TabOptions.TIPS}
					icon={TipsIcon}
					navigation={navigation}
				/>
				<TabButton
					navigateTo="profile"
					tabOption={TabOptions.PROFILE}
					icon={ProfileIcon}
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
				{/* <Text
					style={[
						{ fontSize: 11 },
						focused ? styles.tabButton.focused : styles.tabButton.notFocused,
						typefaces.pm,
					]}
				>
					{label}
				</Text> */}
			</View>
		</Ripple>
	);
});

const Badge = () => (
	<View style={styles.badge.wapper}>
		<View style={styles.badge.circle} />
	</View>
);

const TabButton = connect((state) => ({ activeTab: state.activeTab }))(TabButtonBase);

const TabButtonBadge = connect(({ activeTab, newNotification }) => ({
	activeTab,
	newNotification,
}))((props) => {
	return (
		<View style={styles.badge.view}>
			{props.newNotification && <Badge />}
			<TabButtonBase {...props} />
		</View>
	);
});

const styles = {
	tabButton: {
		ripple: { paddingTop: 10, paddingBottom: 10 },
		view: tailwind('flex items-center w-16'),
		focused: tailwind('text-black'),
		notFocused: tailwind('text-gray-500'),
	},
	bar: {
		view: { ...shadowStyle, backgroundColor: 'white' },
		line: [{ height: 2 }, tailwind('bg-gray-200')],
		buttons: tailwind('flex flex-row justify-evenly pb-1 pt-1 items-center'),
	},
	badge: {
		view: { position: 'relative' },
		circle: [tailwind('rounded-full bg-pink-500'), { width: 9, height: 9 }],
		wapper: [
			tailwind('absolute bg-pink-100 items-center'),
			{ right: 14, top: 8, width: 10, height: 10 },
		],
	},
};

export default TabMenuNavigator;
