import { setGenericPassword, resetGenericPassword } from 'react-native-keychain';
import Fetch from '../../utils/Fetch';
import { generateDeviceInfo } from '../../utils/firebase'

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
export function authRequest(url, form, onSuccess, onError) {
   return (dispatch) =>
      generateDeviceInfo().then((info) => {
         form = {...form, device: info};
         Fetch.post(url, form)
            .then(({ body }) => {
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
               console.log(error);
               onError(error);
               dispatch(logout());
            });
      });
      
}

export function logoutAction() {
   return (dispatch) =>
      resetGenericPassword()
         .then((succes) => {
            dispatch(logout());
         })
         .catch((error) => {
            console.error('Error deleting the token', error.message);
            dispatch(logout());
         });
}
