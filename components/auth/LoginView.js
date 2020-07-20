import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';
import CustomButton from '../shared/CustomButton';
import { loginRequest } from '../../redux/auth/actions';

function LoginView(props) {
  const [loading, setLoading] = React.useState(false);
  const [credentials, setCredentials] = React.useState({
    identifier: '',
    password: '',
  });

  function onLogin() {
    props.dispatch(
      loginRequest(
        credentials,
        (res) => console.log('res::', res),
        (err) => console.log('err::', err),
      ),
    );
  }

  return (
    <View>
      <View>
        <Text>Logo</Text>
      </View>
      <View>
        <View>
          <TextInput
            placeholder="email, cédula o código"
            onChangeText={(text) => setCredentials({ ...credentials, identifier: text })}
          />
        </View>
        <View>
          <TextInput
            placeholder="contraseña"
            onChangeText={(text) => setCredentials({ ...credentials, password: text })}
          />
        </View>
        <CustomButton text="Iniciar sesión" loading={loading} onPress={onLogin} />
      </View>
    </View>
  );
}

export default connect()(LoginView);
