import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Resume } from './TopupDataView';
import { typefaces } from '../../utils/styles';
import tailwind from 'tailwind-rn';
import InfoIcon from '../icons/InfoIcon';
import Button from '../shared/Button';
import Modal from 'react-native-modal';
import CheckRoundedIcon from '../icons/CheckRoundedIcon';
import FetchClient from '../../utils/FetchClient';
import { getOrderByAmount } from '../../utils/utils';
import SimpleToast from 'react-native-simple-toast';

class ConfirmTopupView extends React.Component {
   constructor(props) {
      super(props);
      this.state = { showModal: false, sending: false };
   }

   accept = () => {
      this.setState({ showModal: true, sending: true });
      const { amount, card, company } = this.props.route.params;
      console.log('');

      FetchClient.post('/payment/card/debit/', {
         card: { token: card.token },
         order: { ...getOrderByAmount(amount), total: amount },
         company: company,
      })
         .then((res) => {
            console.log(res);
            if (!card.save) {
               FetchClient.delete('/payment/user/card/', card)
                  .then((res) => console.log(res))
                  .catch((err) => console.log('on delete::::', err))
                  .finally(() => this.setState({ sending: false }));
            } else {
               this.setState({ sending: false });
            }
         })
         .catch((err) => {
            this.setState({ sending: false, showModal: false });
            SimpleToast.show('No se pudo completar la transacción');
         });
   };

   cancel = () => {
      this.props.navigation.reset({ index: 0, routes: [{ name: 'tabMenu' }] });
   };

   render() {
      const { amount, company } = this.props.route.params;
      return (
         <View style={tailwind('items-center h-full')}>
            <View style={tailwind('mt-12')}>
               <Message />
            </View>

            <View style={tailwind('mt-12')}>
               <Resume
                  amount={50}
                  showAmount
                  useGreen={false}
                  extra={{ label: 'Pago', value: 'Visa' }}
               />
            </View>

            <Modal
               isVisible={this.state.showModal}
               animationIn="fadeIn"
               animationOut="fadeOut"
               backdropTransitionOutTiming={0}
               style={tailwind('flex items-center')}
            >
               <View style={tailwind('w-full h-56 bg-white rounded-lg')}>
                  {this.state.sending && <Wait />}
                  {!this.state.sending && (
                     <Done
                        amount={amount}
                        company={company.business_name}
                        navigation={this.props.navigation}
                     />
                  )}
               </View>
            </Modal>

            <View style={tailwind('absolute bottom-0 right-0 mb-8 mr-8 flex flex-row')}>
               <Button text={'cancelar'} onPress={this.cancel} primary={false} />
               <Button text={'recargar'} onPress={this.accept} style={tailwind('ml-4')} />
            </View>
         </View>
      );
   }
}

function Wait(props) {
   return (
      <View style={tailwind('p-6 rounded-md')}>
         <Text style={[tailwind('text-base'), typefaces.pm]}>Realizando la recarga.</Text>
         <View style={tailwind('h-32 flex flex-row justify-center')}>
            <ActivityIndicator color="black" size="large" animating />
         </View>
      </View>
   );
}

function Done({ amount, company, navigation }) {
   function close() {
      navigation.reset({ index: 0, routes: [{ name: 'tabMenu' }] });
   }
   function buy() {}
   return (
      <View style={tailwind('p-6 rounded-md')}>
         <View style={tailwind('flex flex-row')}>
            <CheckRoundedIcon />
            <Text style={[tailwind('text-base ml-4'), typefaces.psb]}>Hecho</Text>
         </View>
         <View style={tailwind('flex flex-row justify-center mt-8')}>
            <Text style={[tailwind('text-sm'), typefaces.pm]}>
               Se han recargado ${amount} en {company}
            </Text>
         </View>
         <View style={tailwind('flex flex-row justify-evenly mt-8')}>
            <Button text={'cerrar'} primary={false} onPress={close} style={{ width: 100 }} />
            <Button text={'realizar compra'} onPress={buy} style={{ width: 150 }} />
         </View>
      </View>
   );
}

function Message() {
   return (
      <View
         style={tailwind(
            'flex flex-row bg-green-200 items-center rounded-lg px-5 py-3 w-full',
         )}
      >
         <InfoIcon fill={'#38a169'} />
         <Text style={[tailwind('text-green-700 text-sm ml-3'), typefaces.pm]}>
            Confirmar datos de recarga
         </Text>
      </View>
   );
}

export default connect()(ConfirmTopupView);
