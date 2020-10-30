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
import GenerateCodeView from './buy/GenerateCodeView';

const Stack = createStackNavigator();

function HomeNavigator({ dispatch }) {
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
                  <Label text={'Datos de facturación'} style={styles.title} focused />
               ),
               cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            })}
         />
         <Stack.Screen
            name="topupData"
            component={TopupDataView}
            options={() => ({
               headerTitle: () => <Label text={'Recargar saldo'} style={styles.title} focused />,
            })}
         />
         <Stack.Screen
            name="chooseCard"
            component={ChooseCardView}
            options={() => ({
               headerTitle: () => <Label text={'Elegir tarjeta'} style={styles.title} focused />,
            })}
         />
         <Stack.Screen
            name="addCard"
            component={AddCardView}
            options={() => ({
               headerTitle: () => <Label text={'Ingresar tarjeta'} style={styles.title} focused />,
            })}
         />
         <Stack.Screen
            name="confirmTopup"
            component={ConfirmTopupView}
            options={() => ({
               headerTitle: () => <Label text={'Confirmar'} style={styles.title} focused />,
            })}
         />
         <Stack.Screen
            name="buy"
            component={BuyView}
            options={() => ({
               headerTitle: () => (
                  <Label text={'Comprar Combustible'} style={styles.title} focused />
               ),
               cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            })}
         />
         <Stack.Screen
            name="generateCode"
            component={GenerateCodeView}
            options={() => ({
               headerTitle: () => (
                  <Label text={'Comprar Combustible'} style={styles.title} focused />
               ),
            })}
         />
      </Stack.Navigator>
   );
}

const styles = {
   title: tailwind('text-base mt-1'),
};

const mapStateToProps = (state) => ({
   activeTab: state.activeTab,
});

export default connect(mapStateToProps)(HomeNavigator);
