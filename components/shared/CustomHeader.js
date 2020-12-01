import React, { memo } from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import { connect } from 'react-redux';
import { typefaces } from '../utils/styles';
import HamburguerIcon from '../icons/HamburguerIcon';
import Ripple from 'react-native-material-ripple';
import TipsIcon from '../icons/TipsIcon';

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
				<TipsIcon width={16} />
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
	return <Text style={styles.title}>{props.activeTab.label}</Text>;
});
