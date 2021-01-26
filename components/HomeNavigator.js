import React, { memo } from 'react';
import {
	createStackNavigator,
	CardStyleInterpolators,
	HeaderBackButton,
} from '@react-navigation/stack';
import TabMenuNavigator from './mainapp/TabMenuNavigator';
import TopupDataView from './topup/TopupDataView';
import BuyView from './buy/BuyView';
import { CustomHeaderTitle, CustomHeaderLeft, CustomHeaderRight } from './shared/CustomHeader';
import BillingDataView from './topup/BillingDataView';
import Label from './shared/Label';
import tailwind from 'tailwind-rn';
import ChooseCardView from './payment/ChooseCardView';
import AddCardView from './payment/AddCardView';
import ConfirmTopupView from './topup/ConfirmTopupView';
import GenerateCodeView from './buy/GenerateCodeView';
import { TabOptions } from './redux/ui/reducers';

const Stack = createStackNavigator();

class HomeNavigator extends React.Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<Stack.Navigator
				screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
				initialRouteName="tabMenu"
			>
				<Stack.Screen
					name="tabMenu"
					component={TabMenuNavigator}
					options={({ navigation }) => ({
						headerTransparent: true,
						headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
						headerTitle: () => <CustomHeaderTitle />,
						headerRight: () => (
							<CustomHeaderRight
								navigation={navigation}
								tabOption={TabOptions.NOTIFICATIONS}
							/>
						),
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
					name="editProfileFromTabMenu"
					component={BillingDataView}
					options={() => ({
						headerTitle: () => <Label text={'Editar perfil'} style={styles.title} focused />,
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
						headerTitle: () => (
							<Label text={'Ingresar tarjeta'} style={styles.title} focused />
						),
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
						headerShown: false,
						cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
					})}
				/>
				<Stack.Screen
					name="buyAfterTopup"
					component={BuyView}
					options={({ navigation }) => ({
						headerLeft: () => (
							<HeaderBackButton
								onPress={() => navigation.reset({ index: 0, routes: [{ name: 'home' }] })}
							/>
						),
						headerTitle: () => (
							<Label text={'Comprar Combustible'} style={styles.title} focused />
						),
						cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
					})}
				/>
				<Stack.Screen
					name="generateCode"
					component={GenerateCodeView}
					options={({ navigation }) => ({
						headerShown: false,
						headerLeft: () => (
							<HeaderBackButton
								onPress={() => navigation.reset({ index: 0, routes: [{ name: 'home' }] })}
							/>
						),
						headerTitle: () => (
							<Label text={'Código de compra'} style={styles.title} focused />
						),
					})}
				/>
			</Stack.Navigator>
		);
	}
}

const styles = {
	title: tailwind('text-base mt-1'),
};

export default memo(HomeNavigator);
