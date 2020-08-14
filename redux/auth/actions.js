import { setGenericPassword } from 'react-native-keychain';
import FetchClient from '../../utils/FetchClient';

/**
 * Simple actions creator
 */
export const login = (userData) => ({
  type: 'LOGIN',
  userData,
});

export const logout = () => ({
  type: 'LOGOUT',
});

/**
 * ASYNC actions creator
 */
export const loginRequest = (form, onSuccess, onError) => (dispatch) => {
  return FetchClient.post('/auth/local/', form)
    .then((data) => {
      setGenericPassword('token', data.token)
        .then((succes) => {
          FetchClient.setAuthToken(data.token);
          dispatch(login({ userData: data.user }));
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


export const signupRequest = (form, onSuccess, onError) => (dispatch) => {
  return FetchClient.post('/users/signup/', form)
    .then((data) => {
      setGenericPassword('token', data.token)
        .then((succes) => {
          FetchClient.setAuthToken(data.token);
          dispatch(login({ userData: data.user }));
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

