import { setGenericPassword, resetGenericPassword } from 'react-native-keychain';
import Fetch from '../../utils/Fetch';

/**
 * Simple actions creator
 */
export const login = (userData) => ({
   type: 'LOGIN',
   data: userData,
});

export const logout = () => ({
   type: 'LOGOUT',
});

/**
 * ASYNC actions creator
 */
export const authRequest = (url, form, onSuccess, onError) => (dispatch) => {
   return Fetch.post(url, form)
      .then(({body}) => {
         setGenericPassword('token', body.token)
            .then((succes) => {
               Fetch.setAuthToken(body.token);
               dispatch(login(body.user));
               onSuccess(body);
            })
            .catch((error) => {
               console.error('Error saving the token', error.message);
            });
      })
      .catch((error) => {
			console.log(error)
         onError(error);
         dispatch(logout());
      });
};

export const logoutAction = () => (dispatch) => {
   return resetGenericPassword()
      .then((succes) => {
         dispatch(logout());
      })
      .catch((error) => {
         console.error('Error deleting the token', error.message);
         dispatch(logout());
      });
};
