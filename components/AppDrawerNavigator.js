import React, { memo } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar, View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProfileNavigator from './profile/ProfileNavigator';
import HomeNavigator from './HomeNavigator';
import SplashScreen from 'react-native-splash-screen';
import { theme, FULL_HIGHT } from './utils/constants';
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

const Drawer = createDrawerNavigator();

function AppDrawerNavigator(props) {
   const [loaded, setLoaded] = React.useState(false);

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
            setLoaded(true);
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

   return (
      <NavigationContainer theme={theme}>
         {loaded ? (
            <Drawer.Navigator
               drawerContent={({ navigation }) => <DrawerContent navigation={navigation} />}
            >
               <Drawer.Screen
                  name="home"
                  component={HomeNavigator}
                  options={{ drawerLabel: () => null }}
               />
               <Drawer.Screen name="profile" component={ProfileNavigator} />
               <Drawer.Screen name="records" component={RecordsNavigator} />
               <Drawer.Screen name="paymentMethods" component={PaymentMethodsNavigator} />
               <Drawer.Screen name="transfers" component={TransferNavigator} />
               <Drawer.Screen name="logout" component={LogoutView} />
               <Drawer.Screen name="loggingOut" component={LoggingOutView} />
            </Drawer.Navigator>
         ) : (
            <View style={[tailwind('flex flex-row justify-center'), { height: FULL_HIGHT }]}>
               <ActivityIndicator animating color="black" size="large" />
            </View>
         )}
      </NavigationContainer>
   );
}

const DrawerContent = memo(({ navigation }) => {
   return (
      <View>
         <ProfileInfo />
         <Line style={{ height: 1.5 }} />
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
         <Line style={{ height: 1.5 }} />
         <View>
            <DrawerItem
               icon={<CardIcon />}
               text="Métodos de pagos"
               style={tailwind('py-1')}
               navigation={navigation}
               navigateTo="paymentMethods"
            />
         </View>
         <Line style={{ height: 1.5 }} />
         <View>
            <DrawerItemText
               text="Sugerencias y reclamos"
               style={tailwind('pt-2')}
               navigation={navigation}
            />
            <DrawerItemText text="Políticas de servicios" navigation={navigation} />
            <DrawerItemText text="Contácto" navigation={navigation} />
            <LogoutItem navigation={navigation} />
         </View>
      </View>
   );
});

const ProfileInfo = connect((state) => ({ user: state.user }))(({ user }) => {
   return (
      <View style={tailwind('p-6')}>
         <Text style={styles.title}>
            {user.data.first_name} {user.data.last_name}
         </Text>
         <Text style={styles.info}>{user.data.email}</Text>
         <Text style={styles.info}>Id: {user.data.cedula}</Text>
         {user.data.is_active ? (
            <Text style={styles.status}>activo</Text>
         ) : (
            <Text style={styles.statusInactive}>inactivo</Text>
         )}
      </View>
   );
});

function DrawerItem({ icon, text, style = {}, navigation, navigateTo }) {
   return (
      <Ripple style={style} onPress={() => navigation.navigate(navigateTo)}>
         <View style={styles.itemCont}>
            {icon && <View style={styles.itemIconCont}>{icon}</View>}
            <Text style={styles.itemText}>{text}</Text>
         </View>
      </Ripple>
   );
}

function DrawerItemText({ text, style = {}, navigation }) {
   return (
      <Ripple style={style}>
         <View style={tailwind('py-2 px-3')}>
            <Text style={styles.itemTextText}>{text}</Text>
         </View>
      </Ripple>
   );
}

function LogoutItem({ style, navigation }) {
   function onPress() {
      navigation.navigate('logout', {});
   }
   return (
      <Ripple style={style} onPress={onPress}>
         <View style={tailwind('flex flex-row items-center py-2 px-3')}>
            <Text style={[styles.itemTextText, { marginRight: 15 }]}>Cerrar Sesión</Text>
            <LogoutIcon />
         </View>
      </Ripple>
   );
}

const styles = {
   itemCont: tailwind('flex flex-row px-4 py-3'),
   itemIconCont: tailwind('w-8'),
   itemText: [tailwind('text-base text-gray-700'), typefaces.pm],
   title: [tailwind('text-lg'), typefaces.pm],
   info: [tailwind('text-sm text-gray-700'), typefaces.pm],
   status: [tailwind('text-sm text-green-600'), typefaces.pm],
   statusInactive: [tailwind('text-sm text-red-500'), typefaces.pm],
   itemTextText: [tailwind('text-base text-gray-700'), typefaces.pr],
   modal: {
      bg: {},
   },
};

export default AppDrawerNavigator;
