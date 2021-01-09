import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import Ripple from 'react-native-material-ripple';
import { btn_text, btn_primary } from '../utils/colors';

export default function LoadingButton({
	text,
	onPress,
	icon,
	loading,
	iconPos,
	style,
	textStyle = {},
	viewStyle = {},
}) {
	return (
		<Ripple
			onPress={onPress}
			style={[tailwind('rounded-3xl items-center w-40'), style ? style : {}]}
			rippleColor="#ffffff"
			rippleSize={500}
			rippleDuration={600}
		>
			<View
				style={[
					tailwind('rounded-3xl items-center w-full py-3'),
					{ backgroundColor: btn_primary },
					icon ? tailwind('flex flex-row justify-evenly') : {},
					viewStyle,
				]}
			>
				{loading ? (
					<ActivityIndicator animating={loading} size="small" color="#ffffff" />
				) : (
					<>
						{icon && iconPos === 'left' && <View>{icon}</View>}
						<Text style={[{ color: btn_text }, typefaces.psb, textStyle]}>{text}</Text>
						{icon && iconPos === 'right' && <View>{icon}</View>}
					</>
				)}
			</View>
		</Ripple>
	);
}
