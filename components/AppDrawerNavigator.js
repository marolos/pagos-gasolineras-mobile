import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProfileView from './profile/ProfileView';
import PaymentMethodsView from './payment/PaymentMethodsView';
import HomeNavigator from './HomeNavigator';
import SplashScreen from 'react-native-splash-screen';
import { theme, FULL_HIGHT } from '../utils/constants';
import { getGenericPassword, resetGenericPassword } from 'react-native-keychain';
import FetchClient from '../utils/FetchClient';
import tailwind from 'tailwind-rn';

const Drawer = createDrawerNavigator();

function AppDrawerNavigator(props) {
   const [loaded, setLoaded] = React.useState(false);
   React.useEffect(() => {
      SplashScreen.hide();
      getGenericPassword()
         .then((credentials) => {
            FetchClient.setAuthToken(credentials.password);
            setLoaded(true);
         })
         .catch((error) => {
            FetchClient.setAuthToken('');
            resetGenericPassword()
               .then(() => {})
               .catch((err) => {});
         });
   }, []);
   return (
      <NavigationContainer theme={theme}>
         {loaded ? (
            <>
               <StatusBar hidden={false} backgroundColor="black" />
               <Drawer.Navigator>
                  <Drawer.Screen
                     name="home"
                     component={HomeNavigator}
                     options={{ drawerLabel: () => null }}
                  />
                  <Drawer.Screen name="profile" component={ProfileView} />
                  <Drawer.Screen name="payment" component={PaymentMethodsView} />
               </Drawer.Navigator>
            </>
         ) : (
            <View style={[tailwind('flex flex-row justify-center'), { height: FULL_HIGHT }]}>
               <ActivityIndicator animating color="black" size="large" />
            </View>
         )}
      </NavigationContainer>
   );
}

export default AppDrawerNavigator;
