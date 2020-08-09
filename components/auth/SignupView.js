import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, View, TextInput, Image, Text } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import { typefaces } from '../../utils/styles';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, FULL_HIGHT } from '../../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';
import BackIcon from '../icons/BackIcon';
import { signupRequest } from '../../redux/auth/actions';


function SignupView(props) {
  const [loading, setLoading] = React.useState(false);
  const [information, setInformation] = React.useState({
    first_name: '',
    last_name: '',
    emial: '',
    password1: '',
    password2: '',
  });

  function onRegister() {
    setLoading(true);
    props.dispatch(
      signupRequest(
        credentials,
        (res) => {
        },
        (err) => {
          console.error(':: err ::', err);
          setLoading(false);
        },
      ),
    );
  }

  return (
    <ScrollView>
      <View style={[tailwind('items-center'), { height: FULL_HIGHT }]}>
        <View style={tailwind('relative')}>
          <Image
            source={require('../../assets/background/bg.jpg')}
            style={{ width: FULL_WIDTH, height: FULL_WIDTH + 60 }}
          />
          <View style={[tailwind('absolute'), { top: 25, left: 25 }]}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              activeOpacity={0.7}
              style={tailwind('rounded-md mb-4')}
            >
              <BackIcon />
            </TouchableOpacity>
            <Text style={[tailwind('text-2xl'), typefaces.pb]}>Crear una cuenta</Text>
          </View>
        </View>
        <View
          style={[
            tailwind(
              'absolute bg-white items-center rounded border-2 border-gray-200 px-6 py-8',
            ),
            styles.card,
          ]}
        >
          <View>
            <View>
              <TextInput
                placeholder="Nombres"
                style={[tailwind('bg-gray-200 rounded-md w-64 my-2 mx-3 pl-5'), typefaces.pm]}
                onChangeText={(data) => setInformation({ ...information, first_name: data })}
                onTouch
              />
            </View>
            <View>
              <TextInput
                placeholder="Apellidos"
                style={[tailwind('bg-gray-200 rounded-md w-64 my-2 mx-3 pl-5'), typefaces.pm]}
                onChangeText={(data) => setInformation({ ...information, last_name: data })}
              />
            </View>
            <View>
              <TextInput
                placeholder="Correo"
                style={[tailwind('bg-gray-200 rounded-md w-64 my-2 mx-3 pl-5'), typefaces.pm]}
                onChangeText={(data) => setInformation({ ...information, emial: data })}
              />
            </View>
            <View>
              <TextInput
                placeholder="Contraseña"
                style={[tailwind('bg-gray-200 rounded-md w-64 my-2 mx-3 pl-5'), typefaces.pm]}
                secureTextEntry={true}
                onChangeText={(data) => setInformation({ ...information, password1: data })}
              />
            </View>
            <View>
              <TextInput
                placeholder="Confirmar contraseña"
                style={[tailwind('bg-gray-200 rounded-md w-64 m-2 pl-5'), typefaces.pm]}
                secureTextEntry={true}
                onChangeText={(data) => setInformation({ ...information, password2: data })}
              />
            </View>
          </View>
          <View style={tailwind('mt-5 items-center')}>
            <LoadingButton text={'Registrarse'} onPress={onRegister} loading={loading} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { top: 200 },
});

export default connect()(SignupView);
