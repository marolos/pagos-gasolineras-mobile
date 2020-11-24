import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import LoadingButton from '../shared/LoadingButton';
import { typefaces } from '../utils/styles';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, FULL_HIGHT, EMAIL_REGEX } from '../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';
import BackIcon from '../icons/BackIcon';
import BasicInput from '../shared/BasicInput';
import Ripple from 'react-native-material-ripple';
import SimpleToast from 'react-native-simple-toast';
import Fetch from '../utils/Fetch';
import Button from '../shared/Button';
import InfoIcon from '../icons/InfoIcon';

class ResetpassView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         allValidated: false,
         loading: false,
         showModal: false,
         information: {
            email: '',
         },
      };
   }

   onRegister = () => {
      Keyboard.dismiss();
      if (this.state.loading) return;

      const {
         information: { email },
      } = this.state;

      if (!email) {
         SimpleToast.show('Por ingrese un correo electronico.');
         this.setState({ loading: false });
         return;
      }

      if (!EMAIL_REGEX.test(email)) {
         SimpleToast.show('Ingrese un correo válido');
         this.setState({ loading: false });
         return;
      }

      this.setState({ loading: true });
      const data = {
         email: email,
      };

      Fetch.post('/users/reset/password/', data)
         .then((resp) => {
            SimpleToast.show('Exito, ' + resp["body"]["msg"] );
            this.setState({ loading: false, showModal: true });
         })
         .catch((error) => {
            if (error.status === 400) SimpleToast.show('Error al intentar enviar el correo.');
            this.setState({ loading: false });
         });
   };

   render() {
      return (
         <ScrollView keyboardShouldPersistTaps="handled">
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
                     <Text style={[tailwind('text-2xl'), typefaces.pb]}>Recuperar contraseña</Text>
                  </View>
               </View>

               <View style={[styles.card, tailwind('mx-8')]}>
                  <View >
                     <View style={[tailwind('items-center')]}>
                        <Text style={[typefaces.pr, tailwind('text-center')]}>Ingrese su correo electrónico le enviaremos un enlace para que recupere el acceso a su cuenta.</Text>
                     </View>
                     <View  style={tailwind('mt-5 items-center')}>
                        <BasicInput
                           placeholder="Correo electrónico"
                           onChange={(text) =>
                              this.setState((state) => ({
                                 information: { ...state.information, email: text },
                              }))
                           }
                           style={tailwind('my-1')}
                           validate={(text) => EMAIL_REGEX.test(text)}
                        />
                     </View>
                     <View style={tailwind('mt-5 items-center')}>
                        <LoadingButton
                           text={'Enviar enlace'}
                           onPress={this.onRegister}
                           loading={this.state.loading}
                        />
                     </View>
                  </View>
               </View>
            </View>

            <Modal
               isVisible={this.state.showModal}
               animationIn="fadeIn"
               animationOut="fadeOut"
               backdropTransitionOutTiming={0}
               style={tailwind('w-full flex items-center m-0')}
            >

               <View style={tailwind('w-full bg-white rounded-lg')}>
                  <View style={tailwind('p-6 rounded-md')}>
                     <View style={tailwind('flex flex-row')}>
                        <InfoIcon />
                        <Text style={[tailwind('text-sm ml-4'), typefaces.psb]}>Listo</Text>
                     </View>
                     <View>
                        <View style={tailwind('p-2 pt-5')}>
                           <Text style={[typefaces.pr]}>
                              Si el correo se encuentra registrado debería recibir un correo electrónico.
                           </Text>
                        </View>
                     </View>

                     <View style={tailwind('flex flex-row justify-evenly mt-6')}>
                        <Button text={'Listo'}onPress={() => { this.setState({ showModal: false }); }} />
                     </View>
                  </View>
               </View>
            </Modal>
         </ScrollView>
      );
   }
}

const styles = {
   card: [
      tailwind('absolute bg-white items-center rounded-md border-2 border-gray-200 px-6 py-8'),
      { top: 140 },
   ],
};

export default connect()(ResetpassView);
