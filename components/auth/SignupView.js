import React from 'react';
import { connect } from 'react-redux';
import {StyleSheet, View, TextInput, Image, Dimensions, Text, ScrollView, SafeAreaView, ToastAndroid } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import { typefaces } from '../../utils/styles';
import tailwind from 'tailwind-rn';
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

  const width = Dimensions.get('window').width;
  const heigth = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    card: {
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowRadius: 0,
      elevation: 3,
      padding: 10,
      backgroundColor: '#ffffff',
      opacity: 0.95
    },
    img: {
      marginTop: 0,
      paddingTop: 0,
      top: heigth * -0.102,
      position: 'absolute',
      width:  width + width * 0.45,
      resizeMode: 'contain',
    },
    trian: {
      width: width,
      top: heigth * 0.35,
      height: heigth * 0.2,
      position: 'absolute',
      borderTopWidth: heigth * 0.2,
      borderTopColor: 'transparent',
      borderRightWidth: width,
      borderRightColor: '#ffffff'
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
      marginBottom: '5%',
      overflow: 'scroll'
    },
    txt: {
      position: 'absolute',
      top: 0,
      fontSize: 26,
      left: 0,
      marginTop: '3%',
      marginLeft: '3%'
    },
    scroll: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'scroll'
    }
  });

  function onRegister(){
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
      password1: information.password1,
      password2: information.password2,
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
    <SafeAreaView style={styles.container}>
      <Image 
        source={require('../../assets/background/registro.png')}
        style={styles.img}
      />
      <View 
        style={styles.trian}
      />
      <Text style={[typefaces.pb, styles.txt]}>Crear una cuenta</Text>
      <View style={styles.scroll}>
      <View style={styles.bottom}> 
        <View style={styles.card}>
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
                onChangeText={(data) => setInformation({ ...information, last_name: data })}/>
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
                onChangeText={(data) => setInformation({ ...information, password1: data })}/>
            </View>
            <View>
              <TextInput
                placeholder="Confirmar contraseña"
                style={[tailwind('bg-gray-200 rounded-md w-64 m-2 pl-5'), typefaces.pm]}
                secureTextEntry={true}
                onChangeText={(data) => setInformation({ ...information, password2: data })}/>
            </View>
        </View>
        <View style={tailwind('mt-5 items-center')}>
          <LoadingButton text={'Registrarse'} onPress={onRegister} loading={loading}/>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
}

export default connect()(SignupView);
