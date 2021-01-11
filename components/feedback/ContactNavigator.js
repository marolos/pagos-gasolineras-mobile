import React from 'react';
import {
	CardStyleInterpolators,
	createStackNavigator,
	HeaderBackButton,
} from '@react-navigation/stack';
import Label from '../shared/Label';
import tailwind from 'tailwind-rn';
import ContactView from './ContactView';

const Stack = createStackNavigator();

export default function ContactNavigator({ navigation }) {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<Stack.Screen
				name="feedbackView"
				component={ContactView}
				options={() => ({
					headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
					headerTitle: () => (
						<Label
							text={'Contacto'}
							style={tailwind('text-base mt-1')}
							focused
						/>
					),
				})}
			/>
		</Stack.Navigator>
	);
}
