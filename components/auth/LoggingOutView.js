import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import tailwind from 'tailwind-rn';
import { logoutAction } from '../../redux/auth/actions';
import { FULL_HIGHT, FULL_WIDTH } from '../../utils/constants';
import Fetch from '../../utils/Fetch';
import { getMessaging } from '../notification/firebaseConfig';

export default function LoggingOutView({ navigation }) {
   const dispatch = useDispatch();

   React.useEffect(() => {
      getMessaging()
         .getToken()
         .then((token) => {
            Fetch.delete('/notification/user/token/', { token: token })
               .then((res) => {})
               .catch((err) => {})
               .finally(() => dispatch(logoutAction()));
            getMessaging()
               .deleteToken()
               .then(() => {})
               .catch(() => {});
         })
         .catch((err) => dispatch(logoutAction()));
   }, []);

   return (
      <View style={styles.container}>
         <ActivityIndicator size="large" color="black" animating />
      </View>
   );
}

const styles = {
   container: [
      {
         margin: 0,
         height: FULL_HIGHT + 40,
         width: FULL_WIDTH + 5,
      },
      tailwind('flex items-center justify-center'),
   ],
};
