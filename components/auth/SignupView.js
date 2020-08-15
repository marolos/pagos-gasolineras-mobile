import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, View, TextInput, Image, Text } from 'react-native';
//import Toast, {DURATION} from 'react-native-easy-toast'
import LoadingButton from '../shared/LoadingButton';
import { typefaces } from '../../utils/styles';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, FULL_HIGHT, EMAIL_REGEX } from '../../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';
import BackIcon from '../icons/BackIcon';
import { signupRequest } from '../../redux/auth/actions';
import { passwordValidator } from '../../utils/utils';
import BasicInput from './BasicInput';
import PasswordInput from './PasswordInput';

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
      this.setState({ loading: false });
      return;
    }

    const passValid = passwordValidator(password1, password2);
    if (!passValid.isValid) {
      this.setState({ loading: false });
      console.log(passValid.message);
      return;
    }

    const data = {
      email: information.email,
      first_name: information.first_name,
      last_name: information.last_name,
      password: information.password1,
    };

    this.props.dispatch(
      signupRequest(
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
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
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
              <BasicInput
                placeholder="Nombres"
                onChangeText={(text) =>
                  this.setState((state) => ({
                    information: { ...state.information, first_name: text },
                  }))
                }
                validate={(text) => text && text != ''}
              />
              <BasicInput
                placeholder="Apellidos"
                onChangeText={(text) =>
                  this.setState((state) => ({
                    information: { ...state.information, last_name: text },
                  }))
                }
                validate={(text) => text && text != ''}
              />
              <BasicInput
                placeholder="Correo"
                onChangeText={(text) =>
                  this.setState((state) => ({
                    information: { ...state.information, email: text },
                  }))
                }
                validate={(text) => EMAIL_REGEX.test(text)}
              />
              <PasswordInput
                placeholder="Contraseña"
                onChangeText={(text) =>
                  this.setState((state) => ({
                    information: { ...state.information, password1: text },
                  }))
                }
                validate={(text) => text && text != ''}
              />
              <PasswordInput
                placeholder="Contraseña"
                onChangeText={(text) =>
                  this.setState((state) => ({
                    information: { ...state.information, password2: text },
                  }))
                }
                validate={(text) => text && text != ''}
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
  card: { top: 200 },
});

export default connect()(SignupView);
