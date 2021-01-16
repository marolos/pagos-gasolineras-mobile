import React, { memo } from 'react';
import { View, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import { connect } from 'react-redux';
import { typefaces } from '../utils/styles';
import HamburguerIcon from '../icons/HamburguerIcon';
import Ripple from 'react-native-material-ripple';
import TipsIcon from '../icons/TipsIcon';
import logo from '../../assets/img/logo.png'
import notificacion from '../../assets/img/notificaciones.png'; 

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

export const CustomHeaderRight = memo(({ navigation }) => {
	const go = () => setTimeout(() => navigation.navigate('tips'), 120);
	return (
		<Ripple style={styles.ripple} onPress={go} rippleDuration={200} rippleCentered>
			<View style={[styles.view, { marginRight: 6 }]}>
				<Image source={notificacion} style={{ width: 16, height: 18 }}/>
			</View>
		</Ripple>
	);
});

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
		<Image source={logo} style={tailwind('w-20 h-5')}/>
	</View>;
});
