import React from 'react';
import {
   CardStyleInterpolators,
   createStackNavigator,
   HeaderBackButton,
} from '@react-navigation/stack';
import Label from '../shared/Label';
import tailwind from 'tailwind-rn';
import RecordsView from './RecordsView';

const Stack = createStackNavigator();

export default function RecordsNavigator({ navigation }) {
   return (
      <Stack.Navigator
         screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
         }}
      >
         <Stack.Screen
            name="profileView"
            component={RecordsView}
            options={() => ({
               headerTitle: () => (
                  <Label text={'Historial'} style={tailwind('text-base mt-1')} focused={true} />
               ),
            })}
         />
      </Stack.Navigator>
   );
}
