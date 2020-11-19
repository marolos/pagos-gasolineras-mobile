import React from 'react';
import {
   CardStyleInterpolators,
   createStackNavigator,
   HeaderBackButton,
} from '@react-navigation/stack';
import Label from '../shared/Label';
import tailwind from 'tailwind-rn';
import FeedbackView from './FeedbackView';

const Stack = createStackNavigator();

export default function FeedbackNavigator({ navigation }) {
   return (
      <Stack.Navigator
         screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
         }}
      >
         <Stack.Screen
            name="feedbackView"
            component={FeedbackView}
            options={() => ({
               headerTitle: () => (
                  <Label
                     text={'Sugerencias y reclamos'}
                     style={tailwind('text-base mt-1')}
                     focused
                  />
               ),
            })}
         />
      </Stack.Navigator>
   );
}
