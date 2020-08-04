import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import { loginRequest } from '../../redux/auth/actions';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import TextButton from '../shared/TextButton';
import UserLoginIcon from '../icons/UserLoginIcon';
import PasswordLoginIcon from '../icons/PasswordLoginIcon';

function LoginView(props) {
  const [loading, setLoading] = React.useState(false);
  const [credentials, setCredentials] = React.useState({
    identifier: '',
    password: '',
  });
	
  function onLogin() {
    setLoading(true);
    props.dispatch(
      loginRequest(
        credentials,
        (res) => {
          //setLoading(false);
        },
        (err) => {
          console.error(':: err ::', err);
          setLoading(false);
        },
      ),
    );
  }

  return (
    <View>
      <View style={tailwind('flex flex-row justify-center items-center my-8 mt-24 flex')}>
        <Text style={[tailwind('text-gray-800 text-2xl'), typefaces.psb]}>Fuel</Text>
        <Text style={[tailwind('text-gray-600 text-2xl'), typefaces.psb]}>pay</Text>
      </View>
      <View style={tailwind('items-center items-center w-full')}>
        <View style={tailwind('flex flex-row')}>
          <UserLoginIcon style={tailwind('mt-4')} width={16} heigth={20} />
          <TextInput
            style={[tailwind('bg-gray-200 rounded-md w-64 m-2 pl-5'), typefaces.pm]}
            placeholder="email, cédula o código"
            onChangeText={(text) => setCredentials({ ...credentials, identifier: text })}
          />
        </View>
        <View style={tailwind('flex flex-row')}>
          <PasswordLoginIcon style={tailwind('mt-4')} width={18} heigth={23} />
          <TextInput
            style={[tailwind('bg-gray-200 rounded-md w-64 m-2 pl-5'), typefaces.pm]}
            placeholder="contraseña"
            secureTextEntry={true}
            onChangeText={(text) => setCredentials({ ...credentials, password: text })}
          />
        </View>
        <View style={tailwind('mt-8')}>
          <LoadingButton text="Iniciar sesión" onPress={onLogin} loading={loading} />
        </View>
        <View style={tailwind('mt-8')}>
          <TextButton text="¿Olvidaste tu contraseña?" onPress={() => {}} />
        </View>
        <View style={tailwind('flex flex-row items-center mt-4')}>
          <Text style={[typefaces.pr, { marginRight: 10 }]}>¿No tienes cuenta?</Text>
          <TextButton
            text="Regístrate"
            onPress={() => {props.navigation.push('signup')}}
            style={{ textDecorationLine: 'underline' }}
          />
        </View>
      </View>
    </View>
  );
}

export default connect()(LoginView);
