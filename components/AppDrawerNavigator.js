import React, { memo } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, ActivityIndicator } from 'react-native';
import ProfileNavigator from './profile/ProfileNavigator';
import HomeNavigator from './HomeNavigator';
import SplashScreen from 'react-native-splash-screen';
import { FULL_HIGHT } from './utils/constants';
import { getGenericPassword, resetGenericPassword } from 'react-native-keychain';
import tailwind from 'tailwind-rn';
import Fetch from './utils/Fetch';
import Line from './shared/Line';
import { typefaces } from './utils/styles';
import Ripple from 'react-native-material-ripple';
import TransferNavigator from './transfer/TransfersNavigator';
import RecordsNavigator from './records/RecordsNavigator';
import PaymentMethodsNavigator from './payment/PaymentMethodNavigator';
import LogoutView from './auth/LogoutView';
import { getDeviceInfo, requestUserPermission } from './notification/firebaseConfig';
import LoggingOutView from './auth/LoggingOutView';
import { connect } from 'react-redux';
import FeedbackNavigator from './feedback/FeedbackNavigator';
import BackgroundModal from './notification/BackgroundModal';
import ContactNavigator from './feedback/ContactNavigator';
import ProfileIcon2 from './icons/ProfileIcon2';
import { dollar_text, btn_text } from './utils/colors';
import AdsView from './ads/AdsView';
import PolicyView from './feedback/PolicyView';

const Drawer = createDrawerNavigator();

function AppDrawerNavigator(props) {
	const [loadedCredentials, setLoadedCredentials] = React.useState(false);

	React.useEffect(() => {
		SplashScreen.hide();
		getGenericPassword()
			.then((credentials) => {
				Fetch.setAuthToken(credentials.password);
				requestUserPermission()
					.then((enabled) => {
						if (enabled) getDeviceInfo();
					})
					.catch((err) => {
						err;
					});
				setLoadedCredentials(true);
			})
			.catch((error) => {
				Fetch.removeAuthToken();
				resetGenericPassword()
					.then(() => {})
					.catch((err) => {
						err;
					});
			});
	}, []);

	if (!loadedCredentials) {
		return (
			<View style={[tailwind('flex flex-row justify-center'), { height: FULL_HIGHT }]}>
				<ActivityIndicator animating color="black" size="large" />
			</View>
		);
	}
	return (
		<React.Fragment>
			<Drawer.Navigator
				drawerContent={DrawerContent}
				initialRouteName={'home'}
				drawerStyle={tailwind('px-1')}
			>
				<Drawer.Screen name="home" component={HomeNavigator} />
				<Drawer.Screen name="ads" component={AdsView} />
				{/* <Drawer.Screen name="profile" component={ProfileNavigator} /> */}
				<Drawer.Screen name="records" component={RecordsNavigator} />
				<Drawer.Screen name="paymentMethods" component={PaymentMethodsNavigator} />
				<Drawer.Screen name="transfers" component={TransferNavigator} />
				<Drawer.Screen name="logout" component={LogoutView} />
				<Drawer.Screen name="loggingOut" component={LoggingOutView} />
				<Drawer.Screen name="feedback" component={FeedbackNavigator} options={{}} />
				<Drawer.Screen name="contact" component={ContactNavigator} />
				<Drawer.Screen name="policy" component={PolicyView} />
			</Drawer.Navigator>
			<BackgroundModal />
		</React.Fragment>
	);
}

const DrawerContent = ({ navigation }) => <DrawerContentMemoized navigation={navigation} />;

const DrawerContentMemoized = memo(({ navigation }) => {
	return (
		<View>
			<ProfileInfo />
			{/* <DrawerItem
				// icon={<ProfileIcon fill="#333" />}
				text="Perfil"
				navigation={navigation}
				navigateTo="profile"
			/> */}
			<DrawerItem text="Noticias" navigation={navigation} navigateTo="ads" />
			<DrawerItem text="Transferencias" navigation={navigation} navigateTo="transfers" />
			<DrawerItem text="Historial" navigation={navigation} navigateTo="records" />
			<DrawerItem text="Métodos de pagos" navigation={navigation} navigateTo="paymentMethods" />
			<DrawerItem text="Sugerencias y reclamos" navigation={navigation} navigateTo="feedback" />
			<DrawerItem text="Políticas de servicios" navigation={navigation} navigateTo="policy" />
			<DrawerItem text="Contácto" navigation={navigation} navigateTo="contact" />
			<Line style={tailwind('bg-black my-4')} />
			<LogoutItem navigation={navigation} />
		</View>
	);
});

const ProfileInfo = connect((state) => ({ user: state.user }))(
	memo(({ user }) => (
		<View style={tailwind('flex flex-row items-center p-4')}>
			<ProfileIcon2 width={48} height={48} />
			<View style={tailwind('pl-2 mt-4')}>
				<Text style={[styles.title, { maxWidth: 192 }]}>
					{user.data.first_name} {user.data.last_name}
				</Text>
				<Text style={styles.info}>Id: {user.data.cedula}</Text>
				{user.data.is_active ? (
					<View style={tailwind('flex flex-row items-center')}>
						<Text style={styles.status}>Activo </Text>
						<View style={[tailwind('h-2 w-2 rounded'), { backgroundColor: dollar_text }]} />
					</View>
				) : (
					<View style={tailwind('flex flex-row items-center')}>
						<Text style={styles.status}>Inactivo </Text>
						<View style={tailwind('h-2 w-2 bg-red-500 rounded')} />
					</View>
				)}
			</View>
		</View>
	)),
);

function DrawerItem({ text, style = {}, navigation, navigateTo }) {
	return (
		<Ripple style={[styles.itemCont, style]} onPress={() => navigation.navigate(navigateTo)}>
			<Text style={styles.itemText}>{text}</Text>
		</Ripple>
	);
}

function LogoutItem({ navigation }) {
	return (
		<Ripple onPress={() => navigation.navigate('logout', {})}>
			<View style={[tailwind('flex flex-row items-center py-2 justify-center')]}>
				<Text style={[styles.itemText, { color: btn_text }]}>Cerrar sesión</Text>
			</View>
		</Ripple>
	);
}

const styles = {
	itemCont: tailwind('flex flex-row py-3 pl-8'),
	itemIconCont: tailwind('w-8'),
	itemText: [tailwind('text-base text-black'), typefaces.pr],
	title: [tailwind('text-lg'), typefaces.pm],
	info: [tailwind('text-sm text-gray-700'), typefaces.pm],
	status: [tailwind('text-sm text-gray-500'), typefaces.pm],
	statusInactive: [tailwind('text-sm text-gray-700'), typefaces.pm],
	itemTextText: [tailwind('text-base text-gray-700'), typefaces.pr],
};

export default AppDrawerNavigator;
