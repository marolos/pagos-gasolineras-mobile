import React from 'react';
import {
   CardStyleInterpolators,
   createStackNavigator,
   HeaderBackButton,
} from '@react-navigation/stack';
import Label from '../shared/Label';
import tailwind from 'tailwind-rn';
import PaymentMethodsView from './PaymentMethodsView';

const Stack = createStackNavigator();

export default function PaymentMethodsNavigator({ navigation }) {
   return (
      <Stack.Navigator
         screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
         }}
      >
         <Stack.Screen
            name="paymentMethodsView"
            component={PaymentMethodsView}
            options={() => ({
               headerTitle: () => (
                  <Label text={'Metodos de pagos'} style={tailwind('text-base mt-1')} focused />
               ),
            })}
         />
      </Stack.Navigator>
   );
}
