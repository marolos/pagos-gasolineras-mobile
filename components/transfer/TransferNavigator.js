import React from 'react';
import {
   CardStyleInterpolators,
   createStackNavigator,
   HeaderBackButton,
} from '@react-navigation/stack';
import Label from '../shared/Label';
import TransferView from './TransferView';
import tailwind from 'tailwind-rn';

const Stack = createStackNavigator();

export default function TransferNavigator({ navigation }) {
   return (
      <Stack.Navigator
         screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
         }}
      >
         <Stack.Screen
            name="profileView"
            component={TransferView}
            options={() => ({
               headerTitle: () => (
                  <Label
                     text={'Transferencias de saldo'}
                     style={tailwind('text-base mt-1')}
                     focused={true}
                  />
               ),
            })}
         />
      </Stack.Navigator>
   );
}
