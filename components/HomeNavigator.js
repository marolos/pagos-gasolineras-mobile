import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import TabMenuNavigator from './mainapp/TabMenuNavigator';
import TopupDataView from './topup/TopupDataView';
import BuyView from './buy/BuyView';
import { CustomHeaderTitle, CustomHeaderLeft } from './shared/CustomHeader';
import BillingDataView from './topup/BillingDataView';
import Label from './shared/Label';
import tailwind from 'tailwind-rn';
import ChooseCardView from './payment/ChooseCardView';
import AddCardView from './payment/AddCardView';
import ConfirmTopupView from './topup/ConfirmTopupView';
import FetchClient from '../utils/FetchClient';
import { logoutAction } from '../redux/auth/actions';
import SimpleToast from 'react-native-simple-toast';

const Stack = createStackNavigator();

function HomeNavigator({ dispatch }) {
   React.useEffect(() => {
      FetchClient.get('/auth/check/')
         .then((res) => {})
         .catch((err) => {
            SimpleToast.show('Su sesión ha expirado.', 2000);
            dispatch(logoutAction());
         });
   }, []);
   return (
      <Stack.Navigator
         screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
      >
         <Stack.Screen
            name="tabMenu"
            component={TabMenuNavigator}
            options={({ navigation }) => ({
               headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
               headerTitle: () => <CustomHeaderTitle />,
            })}
         />
         <Stack.Screen
            name="billingData"
            component={BillingDataView}
            options={() => ({
               headerTitle: () => (
                  <Label
                     text={'Datos de facturación'}
                     style={tailwind('text-base mt-1')}
                     focused={true}
                  />
               ),
               cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            })}
         />
         <Stack.Screen
            name="topupData"
            component={TopupDataView}
            options={() => ({
               headerTitle: () => (
                  <Label
                     text={'Recargar saldo'}
                     style={tailwind('text-base mt-1')}
                     focused={true}
                  />
               ),
            })}
         />
         <Stack.Screen
            name="chooseCard"
            component={ChooseCardView}
            options={() => ({
               headerTitle: () => (
                  <Label
                     text={'Elegir tarjeta'}
                     style={tailwind('text-base mt-1')}
                     focused={true}
                  />
               ),
            })}
         />
         <Stack.Screen
            name="addCard"
            component={AddCardView}
            options={() => ({
               headerTitle: () => (
                  <Label
                     text={'Ingresar tarjeta'}
                     style={tailwind('text-base mt-1')}
                     focused={true}
                  />
               ),
            })}
         />
         <Stack.Screen
            name="confirmTopup"
            component={ConfirmTopupView}
            options={() => ({
               headerTitle: () => (
                  <Label text={'Confirmar'} style={tailwind('text-base mt-1')} focused={true} />
               ),
            })}
         />
         <Stack.Screen name="buy" component={BuyView} />
      </Stack.Navigator>
   );
}

const mapStateToProps = (state) => ({
   activeTab: state.activeTab,
});

export default connect(mapStateToProps)(HomeNavigator);
