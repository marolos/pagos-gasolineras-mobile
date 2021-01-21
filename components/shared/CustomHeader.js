import React, { memo } from 'react';
import { View, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import { connect } from 'react-redux';
import { typefaces } from '../utils/styles';
import HamburguerIcon from '../icons/HamburguerIcon';
import Ripple from 'react-native-material-ripple';
import logo from '../../assets/img/logo.png'
import NotificationIcon from '../icons/NotificationIcon'

export const CustomHeaderLeft = memo(({ navigation }) => {
	return (
		<Ripple
			style={styles.ripple}
			onPress={() => navigation.openDrawer()}
			rippleDuration={200}
			rippleCentered
		>
			<View style={styles.view}>
				<HamburguerIcon />
			</View>
		</Ripple>
	);
});

const CustomHeaderRightBase = memo(({ navigation, activeTab, tabOption }) => {
	const focused = activeTab.label === tabOption.label;
	const go = () => navigation.navigate('tabMenu', { screen: 'notifications' })
	return (
		<Ripple style={styles.ripple} onPress={go} rippleDuration={200} rippleCentered>
			<View style={[styles.view, { marginRight: 6 }]}>
				<NotificationIcon focused={focused}/>
			</View>
		</Ripple>
	);
});

export const CustomHeaderRight = connect((state) => ({ activeTab: state.activeTab }))(CustomHeaderRightBase);


const styles = {
	ripple: [tailwind('flex flex-row items-center ml-2')],
	view: { padding: 10, justifyContent: 'center' },
	title: [tailwind('text-base mt-2'), typefaces.pm],
};

const mapStateToProps = (state) => ({
	activeTab: state.activeTab,
});
export const CustomHeaderTitle = connect(mapStateToProps)((props) => {
	return <View style={tailwind('flex flex-row justify-center')}>
		<Image source={logo} style={tailwind('w-24 h-6')}/>
	</View>;
});
