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
import { background } from '../utils/colors';

const Stack = createStackNavigator();

export default function TransfersNavigator(props) {
   return (
      <Stack.Navigator
         screenOptions={{
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				headerShown: false,
				cardStyle: { backgroundColor: background },
         }}
      >
         <Stack.Screen
            name="transfersView"
            component={TransfersView}
            /*options={({ navigation }) => ({
               headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
               headerTitle: () => (
                  <Label
                     text={'Transferencia de saldos'}
                     style={tailwind('text-base mt-1')}
                     focused
                  />
               ),
            })}*/
         />
         <Stack.Screen
            name="createTransferView"
            component={CreateTransferView}
            options={() => ({
               headerTitle: () => (
                  <Label text={'Transferir'} style={tailwind('text-base mt-1')} focused />
               ),
            })}
         />
      </Stack.Navigator>
   );
}
