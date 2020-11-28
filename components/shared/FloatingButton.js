import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { FULL_WIDTH } from '../utils/constants';

const style = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		bottom: 10,
		right: (FULL_WIDTH - 60) / 2,
		zIndex: 10,
	},
	content: {
		borderRadius: 30,
		backgroundColor: 'black',
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
});

export default function FloatingButton({ icon, onPress, init = 0, end = 1 }) {
	const fadeAnim = useRef(new Animated.Value(init)).current;

	Animated.timing(fadeAnim, {
		toValue: end,
		duration: 300,
		useNativeDriver: true,
	}).start();

	return (
		<Animated.View style={[style.wrapper, { opacity: fadeAnim }]}>
			<Ripple rippleContainerBorderRadius={30} onPress={() => onPress()} style={style.content}>
				{icon}
			</Ripple>
		</Animated.View>
	);
}
