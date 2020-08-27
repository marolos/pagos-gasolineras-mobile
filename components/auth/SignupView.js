import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import { typefaces } from '../../utils/styles';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, FULL_HIGHT, EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';
import BackIcon from '../icons/BackIcon';
import { authRequest } from '../../redux/auth/actions';
import { passwordValidator } from '../../utils/utils';
import BasicInput from '../shared/BasicInput';
import PasswordInput from './PasswordInput';
import Toast from 'react-native-simple-toast';
import Ripple from 'react-native-material-ripple';

class SignupView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         allValidated: false,
         loading: false,
         information: {
            first_name: '',
            last_name: '',
            email: '',
            password1: '',
            password2: '',
         },
      };
   }

   onRegister = () => {
      this.setState({ loading: true });

      const {
         information: { first_name, last_name, email, password1, password2 },
      } = this.state;

      if (!first_name && !last_name && !email) {
         Toast.show('Por favor llene todos los campos.');
         this.setState({ loading: false });
         return;
      }

      const passValid = passwordValidator(password1, password2);
      if (!passValid.isValid) {
         Toast.show(passValid.message);
         this.setState({ loading: false });
         return;
      }

      const data = {
         email: email,
         first_name: first_name,
         last_name: last_name,
         password: password1,
      };

      this.props.dispatch(
         authRequest(
            '/users/signup/',
            data,
            (res) => {},
            (err) => {
               console.log(err);
               this.setState({ loading: false });
            },
         ),
      );
   };

   render() {
      return (
         <ScrollView>
            <View style={[tailwind('items-center'), { height: FULL_HIGHT }]}>
               <View style={tailwind('relative')}>
                  <Image
                     source={require('../../assets/background/bg.jpg')}
                     style={{ width: FULL_WIDTH, height: FULL_WIDTH + 60 }}
                  />
                  <View style={[tailwind('absolute'), { top: 25, left: 25 }]}>
                     <Ripple
                        onPress={() => this.props.navigation.goBack()}
								style={tailwind('rounded-full p-2 w-12 h-12 items-center')}
								rippleCentered={true}
                     >
                        <BackIcon />
                     </Ripple>
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
                     <BasicInput
                        placeholder="Nombres"
                        onEndEditing={(text) =>
                           this.setState((state) => ({
                              information: { ...state.information, first_name: text },
                           }))
                        }
                        style={tailwind('my-1')}
                        validate={(text) => text.length > 0}
                     />
                     <BasicInput
                        placeholder="Apellidos"
                        onEndEditing={(text) =>
                           this.setState((state) => ({
                              information: { ...state.information, last_name: text },
                           }))
                        }
                        style={tailwind('my-1')}
                        validate={(text) => text.length > 0}
                     />
                     <BasicInput
                        placeholder="Correo"
                        onEndEditing={(text) =>
                           this.setState((state) => ({
                              information: { ...state.information, email: text },
                           }))
                        }
                        style={tailwind('my-1')}
                        validate={(text) => EMAIL_REGEX.test(text)}
                     />
                     <PasswordInput
                        placeholder="Contraseña"
                        onEndEditing={(text) =>
                           this.setState((state) => ({
                              information: { ...state.information, password1: text },
                           }))
                        }
                        validate={(text) => PASSWORD_REGEX.test(text)}
                     />
                     <PasswordInput
                        placeholder="Contraseña"
                        onEndEditing={(text) =>
                           this.setState((state) => ({
                              information: { ...state.information, password2: text },
                           }))
                        }
                        validate={(text) => PASSWORD_REGEX.test(text)}
                     />
                  </View>
                  <View style={tailwind('mt-5 items-center')}>
                     <LoadingButton
                        text={'Registrarse'}
                        onPress={this.onRegister}
                        loading={this.state.loading}
                     />
                  </View>
               </View>
            </View>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   card: { top: 150 },
});

export default connect()(SignupView);
