import React, { memo } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, ActivityIndicator } from 'react-native';
import ProfileNavigator from './profile/ProfileNavigator';
import HomeNavigator from './HomeNavigator';
import SplashScreen from 'react-native-splash-screen';
import { FULL_HIGHT, FULL_WIDTH } from './utils/constants';
import { getGenericPassword, resetGenericPassword } from 'react-native-keychain';
import tailwind from 'tailwind-rn';
import Fetch from './utils/Fetch';
import Line from './shared/Line';
import ProfileIcon from './icons/ProfileIcon';
import TransferIcon from './icons/TransferIcon';
import { typefaces } from './utils/styles';
import Ripple from 'react-native-material-ripple';
import BookIcon from './icons/BookIcon';
import CardIcon from './icons/CardIcon';
import TransferNavigator from './transfer/TransfersNavigator';
import RecordsNavigator from './records/RecordsNavigator';
import PaymentMethodsNavigator from './payment/PaymentMethodNavigator';
import LogoutIcon from './icons/LogoutIcon';
import LogoutView from './auth/LogoutView';
import { getDeviceInfo, requestUserPermission } from './notification/firebaseConfig';
import LoggingOutView from './auth/LoggingOutView';
import { connect } from 'react-redux';
import FeedbackNavigator from './feedback/FeedbackNavigator';
import BackgroundModal from './notification/BackgroundModal';
import ContactView from './feedback/ContactView';
import ContactNavigator from './feedback/ContactNavigator';
import ProfileIcon2 from './icons/ProfileIcon2';
import { dollar_text, btn_text } from './utils/colors';

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
			<Drawer.Navigator drawerContent={DrawerContent} initialRouteName={'home'} 
			drawerStyle={[{ width: FULL_WIDTH*0.8 }, tailwind('px-1')]}>
				<Drawer.Screen name="home" component={HomeNavigator} />
				<Drawer.Screen name="profile" component={ProfileNavigator} />
				<Drawer.Screen name="records" component={RecordsNavigator} />
				<Drawer.Screen name="paymentMethods" component={PaymentMethodsNavigator} />
				<Drawer.Screen name="transfers" component={TransferNavigator} />
				<Drawer.Screen name="logout" component={LogoutView} />
				<Drawer.Screen name="loggingOut" component={LoggingOutView} />
				<Drawer.Screen name="feedback" component={FeedbackNavigator} options={{}} />
				<Drawer.Screen name="contact" component={ContactNavigator} />
				{/* <Drawer.Screen name="notifications" component={NotificationsView} /> */}
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
			<View style={tailwind('h-2')} /> 
			<View>
				<DrawerItem
					icon={<ProfileIcon fill="#333" />}
					text="Perfil"
					style={tailwind('pt-1')}
					navigation={navigation}
					navigateTo="profile"
				/>
				<DrawerItem
					icon={<BookIcon />}
					text="Historial"
					navigation={navigation}
					navigateTo="records"
				/>
				<DrawerItem
					icon={<TransferIcon width={20} />}
					text="Transferencias"
					style={tailwind('pb-1')}
					navigation={navigation}
					navigateTo="transfers"
				/>
			</View>
			
			<View>
				<DrawerItem
					icon={<CardIcon />}
					text="Métodos de pagos"
					style={tailwind('py-1')}
					navigation={navigation}
					navigateTo="paymentMethods"
				/>
			</View>
			
				<DrawerItem
					text="Sugerencias y reclamos"
					style={tailwind('py-1')}
					navigation={navigation}
					navigateTo="feedback"
				/>
				<DrawerItem text="Políticas de servicios" navigation={navigation} />
				<DrawerItem text="Contácto" navigation={navigation} navigateTo="contact" />
				<Line style={tailwind('bg-black my-4')}/>
				<LogoutItem navigation={navigation} />
		</View>
	);
});

const ProfileInfo = connect((state) => ({ user: state.user }))(
	memo(({ user }) => {
		const w = FULL_WIDTH * 0.8;
		return (
			<View style={[tailwind('flex flex-row items-center'), { padding: w*0.08 }]}>
            <ProfileIcon2 width={w*0.35} height={w*0.35}/>
				<View style={[tailwind('pl-2'), { width: w*0.49 }]}>
				    <Text style={styles.title}>
				    	{user.data.first_name} {user.data.last_name}
				    </Text>
				    <Text style={styles.info}>Id: {user.data.cedula}</Text>
				    {user.data.is_active ? (
						 <View style={tailwind('flex flex-row items-center')}>
							 <Text style={styles.status}>Activo </Text>
							 <View style={[tailwind('h-2 w-2 rounded'), { backgroundColor: dollar_text }]}/>
						 </View>
				    	
				    ) : (
						<View style={tailwind('flex flex-row items-center')}>
							 <Text style={styles.status}>Inactivo </Text>
							 <View style={tailwind('h-2 w-2 bg-red-500 rounded')}/>
						 </View>
				    )}

				</View>
			</View>
		);
	}),
);

function DrawerItem({ icon, text, style = {}, navigation, navigateTo }) {
	const w = FULL_WIDTH * 0.8;
	return (
		<Ripple style={style} onPress={() => navigation.navigate(navigateTo)}>
			<View style={[styles.itemCont, { paddingLeft: w*0.12 }]}>
				{/* {icon && <View style={styles.itemIconCont}>{icon}</View>} */}
				<Text style={styles.itemText}>{text}</Text>
			</View>
		</Ripple>
	);
}

function DrawerItemText({ text, style = {}, navigation, navigateTo }) {
	return (
		<Ripple onPress={navigateTo && (() => navigation.navigate(navigateTo))} style={style}>
			<View style={tailwind('py-2 px-3')}>
				<Text style={styles.itemTextText}>{text}</Text>
			</View>
		</Ripple>
	);
}

function LogoutItem({ style, navigation }) {
	const w = FULL_WIDTH * 0.8;
	return (
		<Ripple style={{ width: w }} onPress={() => navigation.navigate('logout', {})}>
			<View style={[tailwind('flex flex-row items-center py-2 justify-center')]}>
				<Text style={[styles.itemText, { color: btn_text }]}>Cerrar sesión</Text>
			</View>
		</Ripple>
	);
}

const styles = {
	itemCont: tailwind('flex flex-row py-3'),
	itemIconCont: tailwind('w-8'),
	itemText: [tailwind('text-base text-black'), typefaces.pr],
	title: [tailwind('text-xl'), typefaces.pm],
	info: [tailwind('text-sm text-gray-700'), typefaces.pm],
	status: [tailwind('text-sm text-gray-500'), typefaces.pm],
	statusInactive: [tailwind('text-sm text-gray-700'), typefaces.pm],
	itemTextText: [tailwind('text-base text-gray-700'), typefaces.pr],
	modal: {
		bg: {},
	},
};

export default AppDrawerNavigator;

//adb shell am start -W -a android.intent.action.VIEW -d "fuelpay://notification/2/3" com.pagosgasolineras
// const linking = {
//    prefixes: ['fuelpay://'],
//    config: {
//       screens: {
//          home: {
//             screens: {
//                notificationLinking: 'notification/:type/:id',
//             },
//          },
//       },
//    },
// };
