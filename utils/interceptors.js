import SimpleToast from 'react-native-simple-toast';
import { logoutAction } from '../redux/auth/actions';

export function unauthorizedInterceptor(dispatch) {
   function checkAuth(data) {
      if (data.status === 401) {
         SimpleToast.show('Su sesión ha expirado.', 1200);
         dispatch(logoutAction());
      }
   }
   return {
      alias: 'unauthorized',
      fn: checkAuth,
   };
}
