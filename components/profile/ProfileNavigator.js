import {
	CardStyleInterpolators,
	createStackNavigator,
	HeaderBackButton,
} from '@react-navigation/stack';
import React from 'react';
import tailwind from 'tailwind-rn';
import Label from '../shared/Label';
import ProfileView from './ProfileView';

const Stack = createStackNavigator();

export default function ProfileNavigator({ navigation }) {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<Stack.Screen
				name="profileView"
				component={ProfileView}
				options={() => ({
					headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
					headerTitle: () => (
						<Label text={'Perfil'} style={tailwind('text-base mt-1')} focused={true} />
					),
				})}
			/>
		</Stack.Navigator>
	);
}
