import {
	CardStyleInterpolators,
	createStackNavigator,
	HeaderBackButton,
} from '@react-navigation/stack';
import React from 'react';
import tailwind from 'tailwind-rn';
import Label from '../shared/Label';
import TipsView from './TipsView';

const Stack = createStackNavigator();

export default function TipsNavigator({ navigation }) {
	return (
		<Stack.Navigator
			initialRouteName="tipsView"
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<Stack.Screen
				name="tipsView"
				component={TipsView}
				options={() => ({
					headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
					headerTitle: () => (
						<Label text={'Tips'} style={tailwind('text-base mt-1')} focused={true} />
					),
				})}
			/>
		</Stack.Navigator>
	);
}
