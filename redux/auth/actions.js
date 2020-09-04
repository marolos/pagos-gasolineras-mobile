import { setGenericPassword, resetGenericPassword } from 'react-native-keychain';
import FetchClient from '../../utils/FetchClient';

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
   return FetchClient.post(url, form)
      .then((data) => {
         setGenericPassword('token', data.token)
            .then((succes) => {
               FetchClient.setAuthToken(data.token);
               dispatch(login(data.user));
               onSuccess(data);
            })
            .catch((error) => {
               console.error('Error saving the token', error.message);
            });
      })
      .catch((error) => {
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
