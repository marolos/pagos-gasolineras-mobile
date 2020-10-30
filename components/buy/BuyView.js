import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import tailwind from 'tailwind-rn';
import { FULL_HIGHT, FULL_WIDTH } from '../../utils/constants';
import { typefaces } from '../../utils/styles';
import InfoIcon from '../icons/InfoIcon';
import AddSubInput from '../shared/AddSubInput';
import Button from '../shared/Button';
import VehicleIDSelect from './VehicleIDSelect';
import Modal from 'react-native-modal';
import SimpleToast from 'react-native-simple-toast';
import QRIcon from '../icons/QRIcon';
import Ripple from 'react-native-material-ripple';
import Fetch from '../../utils/Fetch';

export default class BuyView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         amount: 0.0,
         vehicle: null,
         balance: this.props.route.params,
         showConfirm: false,
         showBuying: false,
         showBuyDone: false,
      };
   }

   updateAmount = (value) => {
      this.setState(() => ({ amount: value }));
   };

   onSelectVehicle = (value) => {
      this.setState(() => ({ vehicle: value }));
   };

   tryBuy = () => {
      if (this.state.amount < 1) {
         SimpleToast.show('Ingrese una cantidad válida');
         return;
      }
      const { total } = this.state.balance;
      const remaining = total - this.state.amount;
      if (remaining < 0) {
         SimpleToast.show('Saldo insuficiente');
         return;
      }
      this.setState({ showConfirm: true });
   };

   onConfirm = () => {
      this.setState({ showBuying: true, showConfirm: false });
      const { id, gas_station, company } = this.state.balance;

      const data = {
         gas_station,
			company,
			balance_id: id,
         amount: this.state.amount,
         vehicle: this.state.vehicle,
      };

      //Fetch.post('/');

      setTimeout(() => {
         this.setState({ showBuying: false, showBuyDone: true });
      }, 1000);
   };

   onCancel = () => {
      this.setState({ showConfirm: false });
   };

   render() {
      const { gas_station, company, total } = this.state.balance;
      const remaining = total - this.state.amount;
      return (
         <View style={[tailwind('p-6'), { height: FULL_HIGHT, width: FULL_WIDTH }]}>
            <View style={tailwind('flex flex-row justify-between mt-2')}>
               <Text style={[tailwind('text-base'), typefaces.pm]}>Gasolinera: </Text>
               <View style={tailwind('flex flex-row')}>
                  <FastImage
                     source={{ uri: company.company_logo_path }}
                     style={{ width: 25, height: 25 }}
                  />
                  <Text style={[tailwind('text-base ml-2'), typefaces.pr]}>{gas_station.name}</Text>
               </View>
            </View>
            <VehicleIDSelect onChange={this.onSelectVehicle} />
            <View style={tailwind('flex flex-row mt-8')}>
               <Text style={[tailwind('text-base'), typefaces.pm]}>Saldo restante: </Text>
               <Text
                  style={[
                     tailwind('text-base ml-2'),
                     typefaces.pm,
                     remaining <= 0.0 ? tailwind('text-red-600') : tailwind('text-green-600'),
                  ]}
               >
                  ${remaining}
               </Text>
            </View>
            <View style={tailwind('mt-6')}></View>
            <AddSubInput onChange={this.updateAmount} />
            <View style={[tailwind('absolute'), { bottom: 100, right: FULL_WIDTH / 4 }]}>
               <Button
                  text="Realizar compra"
                  onPress={this.tryBuy}
                  style={tailwind('w-40')}
                  viewStyle={tailwind('py-3')}
                  primary
               />
            </View>
            <ConfirmBuyModal
               show={this.state.showConfirm}
               onConfirm={this.onConfirm}
               onCancel={this.onCancel}
               gasStation={gas_station}
               amount={this.state.amount}
            />
            <BuyingModal show={this.state.showBuying} />
            <BuyDoneModal show={this.state.showBuyDone} />
         </View>
      );
   }
}

const ConfirmBuyModal = memo(({ show, onConfirm, onCancel, gasStation, amount }) => {
   return (
      <Modal
         isVisible={show}
         animationIn="fadeIn"
         animationOut="fadeOut"
         backdropTransitionOutTiming={0}
         onSwipeComplete={onCancel}
         onBackdropPress={onCancel}
         swipeDirection={['down']}
         style={tailwind('flex items-center')}
      >
         <View style={tailwind('w-full bg-white rounded-lg')}>
            <View style={tailwind('p-6 rounded-md')}>
               <View style={tailwind('flex flex-row')}>
                  <InfoIcon />
                  <Text style={[tailwind('text-sm ml-4'), typefaces.psb]}>Confirmar compra</Text>
               </View>
               <View>
                  <View style={tailwind('p-6')}>
                     <Text>Gasolinera</Text>
                     <Text>{gasStation.name}</Text>
                  </View>
               </View>
               <View style={tailwind('flex flex-row justify-evenly mt-8')}>
                  <Button
                     text={'cancelar'}
                     primary={false}
                     onPress={onCancel}
                     style={{ width: 100 }}
                  />
                  <Button text={'confirmar'} onPress={onConfirm} />
               </View>
            </View>
         </View>
      </Modal>
   );
});

function BuyingModal({ show }) {
   return (
      <Modal
         isVisible={show}
         animationIn="fadeIn"
         animationOut="fadeOut"
         backdropTransitionOutTiming={0}
         style={tailwind('flex items-center')}
      >
         <View style={tailwind('w-full bg-white rounded-lg')}>
            <View style={tailwind('p-6 rounded-md')}>
               <Text style={[tailwind('text-base'), typefaces.pm]}>Realizando la compra.</Text>
               <View style={tailwind('h-32 flex flex-row justify-center')}>
                  <ActivityIndicator color="black" size="large" animating />
               </View>
            </View>
         </View>
      </Modal>
   );
}

function BuyDoneModal({ show, onCancel, onConfirm }) {
   return (
      <Modal
         isVisible={show}
         animationIn="fadeIn"
         animationOut="fadeOut"
         backdropTransitionOutTiming={0}
         style={tailwind('flex items-center')}
      >
         <View style={tailwind('w-full bg-white rounded-lg')}>
            <View style={tailwind('p-6 rounded-md')}>
               <View style={tailwind('flex flex-row')}>
                  <InfoIcon />
                  <Text style={[tailwind('text-sm ml-4'), typefaces.psb]}>Compra realizada</Text>
               </View>
               <View>
                  <View style={tailwind('p-6')}>
                     <Text>
                        Puede generar el código de la compra ahora, o generarlo luego buscándolo en
                        el menu de compras
                     </Text>
                  </View>
               </View>
               <View style={tailwind('flex flex-row justify-evenly mt-8')}>
                  <Button
                     text={'Cerrar'}
                     primary={false}
                     onPress={onCancel}
                     style={{ width: 100 }}
                  />
                  <QRButton text={'Generar QR'} onPress={onConfirm} />
               </View>
            </View>
         </View>
      </Modal>
   );
}

function QRButton({ onPress, text }) {
   return (
      <Ripple
         onPress={onPress}
         style={tailwind('rounded-md items-center w-56')}
         rippleColor="#ffffff"
         rippleSize={500}
         rippleDuration={600}
      >
         <View style={tailwind('flex flex-row bg-black rounded-md items-center w-full py-4')}>
            <QRIcon />
            <Text style={[tailwind('text-white'), typefaces.pm]}>{text}</Text>
         </View>
      </Ripple>
   );
}
