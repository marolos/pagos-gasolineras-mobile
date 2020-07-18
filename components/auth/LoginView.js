import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';
import AxiosClient from '../../common/axiosClient';
import CustomButton from '../shared/CustomButton';

function LoginView(props) {
  const [loading, setLoading] = React.useState(false);
  const [credential, setCredemtials] = React.useState({
    identifier: '',
    password: '',
  });

  React.useEffect(() => {
    AxiosClient.get('/auth/check')
      .then((res) => console.log('done'))
      .catch((err) => console.error('error:', err));
  }, []);

  return (
    <View>
      <View>
        <Text>Logo</Text>
      </View>
      <View>
        <View>
          <TextInput
            placeholder="email, cédula o código"
            onChangeText={(text) => setCredemtials({ ...credential, identifier: text })}
          />
        </View>
        <View>
          <TextInput
            placeholder="contraseña"
            onChangeText={(text) => setCredemtials({ ...credential, password: text })}
          />
        </View>
        <CustomButton text="Iniciar sesión" loading={loading} onPress={() => {}} />
      </View>
    </View>
  );
}

export default connect()(LoginView);
