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
    email: '',
    password1: '',
    password2: '',
  });

  function onRegister() {
    setLoading(true);
    var nameEmpty = information.first_name == "";
    var lastEmpty = information.last_name == "";
    var emailEmpty = information.emial == "";
    if(nameEmpty || lastEmpty || emailEmpty){
      setLoading(false);
      //TODO: Implement for IOS
      ToastAndroid.show("Debe llenar todos los campos.", ToastAndroid.SHORT)
      return ;
    }
    var passValid = passwordValidator(information.password1, information.password2);
    if(!passValid.isValid){
      setLoading(false);
      //TODO: Implement for IOS
      ToastAndroid.show(passValid.message, ToastAndroid.LONG)
      return ;
    }
    
    var data = {
      cc: '0000000000',  //FIXME: send generic identification,  field in register user class
      email: information.email,
      first_name: information.first_name,
      last_name: information.last_name,
      password: information.password1,
      is_gas_station_admin: false
    }

    props.dispatch(
      signupRequest(data,
        (res) => {
          setLoading(false);
          console.log(res);
        },
        (err) => {
          console.log(err);
          setLoading(false);
        }
      )
    );

  }

  function passwordValidator(pass1, pass2){
    var status = {
      message: "",
      isValid: false
    }
    if(pass1.length < 8) {
      status.message = "La contraseña debe tener al menos 8 catacteres";
      return status;
    }
    if(pass1 != pass2){
      status.message = "Las contraseñas son diferentes";
      return status
    }
    status.isValid = true;
    return status;
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
                onChangeText={(data) => setInformation({ ...information, email: data })}/>
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
