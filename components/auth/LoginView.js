import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import LoadingButton from '../shared/LoadingButton';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import TextButton from '../shared/TextButton';
import UserLoginIcon from '../icons/UserLoginIcon';
import PasswordLoginIcon from '../icons/PasswordLoginIcon';
import FacebookButton from '../shared/FacebookButton';
import { authRequest } from '../../redux/auth/actions';
import SimpleToast from 'react-native-simple-toast';
import { EMAIL_REGEX } from '../../utils/constants';

function LoginView(props) {
   const [state, setState] = React.useState({
      loading: false,
      showModal: false,
      hasEmailError: false,
      credentials: {
         identifier: '',
         password: '',
      },
   });

   function onLogin() {
      Keyboard.dismiss();
      setState((state) => ({ ...state, loading: true }));
      const { identifier, password } = state.credentials;
      if (!identifier || !password) {
         SimpleToast.show('Ingrese sus credenciales.');
         setState((state) => ({ ...state, loading: false }));
         return;
      }
      if (!EMAIL_REGEX.test(identifier)) {
         SimpleToast.show('Ingrese un correo válido.');
         setState((state) => ({ ...state, loading: false }));
         return;
      }
      props.dispatch(
         authRequest(
            '/auth/local/',
            state.credentials,
            (res) => {},
            (err) => {
               if (err.status === 401 || err.status === 403)
                  SimpleToast.show('Datos incorrectos.');
               else SimpleToast.show('Error al iniciar sesión.');
               setState((state) => ({ ...state, loading: false }));
            },
         ),
      );
   }

   function onFacebookLogin(user_access_token) {
      setState((state) => ({ ...state, showModal: true }));
      props.dispatch(
         authRequest(
            '/users/signup/facebook/',
            { token: user_access_token },
            (res) => {},
            (err) => {
               setState((state) => ({ ...state, showModal: false }));
               SimpleToast.show('Error al iniciar sesión.');
            },
         ),
      );
   }

   return (
      <View>
         <View style={tailwind('flex flex-row justify-center items-center my-8 mt-20 flex')}>
            <Text style={[tailwind('text-gray-800 text-2xl'), typefaces.psb]}>Fuel</Text>
            <Text style={[tailwind('text-gray-600 text-2xl'), typefaces.psb]}>pay</Text>
         </View>
         <View style={tailwind('items-center items-center w-full')}>
            <View style={tailwind('flex flex-row')}>
               <UserLoginIcon style={tailwind('mt-5')} width={16} height={20} />
               <TextInput
                  style={[
                     tailwind('bg-gray-200 rounded-md w-64 m-2 pl-5'),
                     state.hasEmailError ? tailwind('border-2 border-red-400') : {},
                     typefaces.pm,
                  ]}
                  placeholder="email"
                  onChangeText={(text) => {
                     setState((state) => ({
                        ...state,
                        credentials: { ...state.credentials, identifier: text },
                        hasEmailError: !EMAIL_REGEX.test(text),
                     }));
                  }}
               />
            </View>
            <View style={tailwind('flex flex-row')}>
               <PasswordLoginIcon style={tailwind('mt-5')} width={18} height={23} />
               <TextInput
                  style={[tailwind('bg-gray-200 rounded-md w-64 m-2 pl-5'), typefaces.pm]}
                  placeholder="contraseña"
                  secureTextEntry={true}
                  onChangeText={(text) =>
                     setState((state) => ({
                        ...state,
                        credentials: { ...state.credentials, password: text },
                     }))
                  }
               />
            </View>
            <View style={tailwind('mt-8')}>
               <LoadingButton
                  text="Iniciar sesión"
                  onPress={onLogin}
                  loading={state.loading}
               />
            </View>
            <View style={tailwind('mt-8')}>
               <TextButton text="¿Olvidaste tu contraseña?" onPress={() => {}} />
            </View>
            <View style={tailwind('flex flex-row items-center mt-4')}>
               <Text style={[typefaces.pr, { marginRight: 10 }]}>¿No tienes cuenta?</Text>
               <TextButton
                  text="Regístrate"
                  onPress={() => {
                     props.navigation.push('signup');
                  }}
                  style={{ textDecorationLine: 'underline' }}
               />
            </View>
            <FacebookButton onFacebookLogin={onFacebookLogin} />
            <Modal
               isVisible={state.showModal}
               animationIn="fadeIn"
               animationOut="fadeOut"
               backdropTransitionOutTiming={0}
               style={tailwind('w-full flex items-center m-0')}
            >
               <View
                  style={tailwind('flex flex-row w-56 h-56 rounded bg-white justify-center')}
               >
                  <ActivityIndicator size="large" animating={state.showModal} color="black" />
               </View>
            </Modal>
         </View>
      </View>
   );
}

export default connect()(LoginView);
