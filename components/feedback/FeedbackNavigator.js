import React from 'react';
import {
	CardStyleInterpolators,
	createStackNavigator,
	HeaderBackButton,
} from '@react-navigation/stack';
import Label from '../shared/Label';
import tailwind from 'tailwind-rn';
import FeedbackView from './FeedbackView';
import FeedbackType from './FeedbackType';

const Stack = createStackNavigator();

export default function FeedbackNavigator({ navigation }) {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<Stack.Screen
				name="feedbackView"
				component={FeedbackView}
				options={() => ({
					headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
					headerTitle: () => (
						<Label
							text={'Sugerencias y reclamos'}
							style={tailwind('text-base mt-1')}
							focused
						/>
					),
				})}
			/>
			<Stack.Screen
				name="feedbackType"
				component={FeedbackType}
				options={() => ({
					headerTitle: () => (
						<Label text={'Elegir tipo'} style={tailwind('text-base mt-1')} focused />
					),
				})}
			/>
		</Stack.Navigator>
	);
}
