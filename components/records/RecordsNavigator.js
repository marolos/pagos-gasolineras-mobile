import React from 'react';
import {
   CardStyleInterpolators,
   createStackNavigator,
   HeaderBackButton,
} from '@react-navigation/stack';
import Label from '../shared/Label';
import tailwind from 'tailwind-rn';
import RecordsView from './RecordsView';
import PurchaseView from './PurchaseView';
import { background } from '../utils/colors';

const Stack = createStackNavigator();

export default function RecordsNavigator({ }) {
   return (
      <Stack.Navigator
         screenOptions={{
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				headerShown: false,
				cardStyle: { backgroundColor: background }
         }}
      >
         <Stack.Screen
            name="recordsView"
            component={RecordsView}
            /*options={({ navigation }) => ({
               headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
               headerTitle: () => (
                  <Label text={'Historial'} style={tailwind('text-base mt-1')} focused={true} />
					),
					
            })}*/
         />
         <Stack.Screen
            name="purchaseDetail"
            component={PurchaseView}
            options={() => ({
               headerTitle: () => (
                  <Label text={'Detalle de la compra'} style={tailwind('text-base mt-1')} focused={true} />
               ),
            })}
         />
      </Stack.Navigator>
   );
}
