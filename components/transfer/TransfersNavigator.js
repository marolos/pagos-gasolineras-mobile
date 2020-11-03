import React from 'react';
import {
   CardStyleInterpolators,
   createStackNavigator,
   HeaderBackButton,
} from '@react-navigation/stack';
import Label from '../shared/Label';
import TransfersView from './TransfersView';
import tailwind from 'tailwind-rn';
import CreateTransferView from './CreateTransferView';

const Stack = createStackNavigator();

export default function TransfersNavigator({ navigation }) {
   return (
      <Stack.Navigator
         screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
         }}
      >
         <Stack.Screen
            name="transfersView"
            component={TransfersView}
            options={() => ({
               headerTitle: () => (
                  <Label
                     text={'Transferencias de saldo'}
                     style={tailwind('text-base mt-1')}
                     focused
                  />
               ),
            })}
         />
         <Stack.Screen
            name="createTransferView"
            component={CreateTransferView}
            options={() => ({
               headerTitle: () => (
                  <Label text={'Transferir saldo'} style={tailwind('text-base mt-1')} focused />
               ),
            })}
         />
      </Stack.Navigator>
   );
}
