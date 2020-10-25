import React from 'react';
import {
   CardStyleInterpolators,
   createStackNavigator,
   HeaderBackButton,
} from '@react-navigation/stack';
import Label from '../shared/Label';
import tailwind from 'tailwind-rn';
import RecordView from './RecordView';

const Stack = createStackNavigator();

export default function RecordNavigator({ navigation }) {
   return (
      <Stack.Navigator
         screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
         }}
      >
         <Stack.Screen
            name="profileView"
            component={RecordView}
            options={() => ({
               headerTitle: () => (
                  <Label text={'Historial'} style={tailwind('text-base mt-1')} focused={true} />
               ),
            })}
         />
      </Stack.Navigator>
   );
}
