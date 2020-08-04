import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import { loginRequest } from '../../redux/auth/actions';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';

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
          setLoading(false);
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
      <View style={tailwind('items-center')}>
        <View>
          <TextInput
            style={[tailwind('bg-gray-200 rounded-md w-64 m-2 pl-5'), typefaces.pm]}
            placeholder="email, cédula o código"
            onChangeText={(text) => setCredentials({ ...credentials, identifier: text })}
          />
        </View>
        <View>
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
      </View>
    </View>
  );
}

export default connect()(LoginView);
