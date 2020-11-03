import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import tailwind from 'tailwind-rn';
import { FULL_HIGHT, FULL_WIDTH } from '../../utils/constants';
import { typefaces } from '../../utils/styles';
import InfoIcon from '../icons/InfoIcon';
import AddSubInput from '../shared/AddSubInput';
import Button from '../shared/Button';
import LoadingModal from '../shared/LoadingModal'
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
         createdPurchase: null,
      };
   }

   updateAmount = (value) => {
      this.setState(() => ({ amount: value }));
   };

   onSelectVehicle = (value) => {
      this.setState(() => ({ vehicle: value }));
   };

   tryBuy = () => {
      const { amount, balance, vehicle } = this.state;
      if (!vehicle) {
         SimpleToast.show('Seleccionar una placa');
         return;
      }
      if (amount < 1) {
         SimpleToast.show('Ingrese una cantidad válida');
         return;
      }
      const remaining = balance.total - amount;
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

      Fetch.post('/purchase/create/', data)
         .then((res) => {
            this.setState({
               showBuying: false,
               showBuyDone: true,
               createdPurchase: res.body.purchase,
            });
         })
         .catch((err) => {
            console.log(err);
            this.setState({ showBuying: false, showBuyDone: false, showConfirm: false });
            SimpleToast.showWithGravity(
               'No se pudo completar la transacción, reintente',
               1000,
               SimpleToast.CENTER,
            );
         });
   };

   onCancel = () => {
      this.setState({ showConfirm: false, showBuyDone: false, showBuying: false });
   };

   close = () => {
      this.props.navigation.reset({ index: 0, routes: [{ name: 'tabMenu' }] });
   };

   goCodeView = () => {
      this.setState({ showBuying: false, showBuyDone: false, showConfirm: false }, () =>
         this.props.navigation.navigate('generateCode', this.state.createdPurchase),
      );
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
            <View style={tailwind('mt-6')} />
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
               vehicle={this.state.vehicle}
            />
            <LoadingModal show={this.state.showBuying} text='Realizando la compra.'/>
            <BuyDoneModal
               show={this.state.showBuyDone}
               onCancel={this.close}
               onConfirm={this.goCodeView}
            />
         </View>
      );
   }
}

const ConfirmBuyModal = memo(({ show, onConfirm, onCancel, gasStation, amount, vehicle }) => {
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
               <View style={tailwind('p-6')}>
                  <View style={tailwind('flex flex-row items-center')}>
                     <Text style={[tailwind('text-sm'), typefaces.pm]}>Gasolinera: </Text>
                     <Text style={[tailwind('text-sm'), typefaces.pr]}>{gasStation.name}</Text>
                  </View>
                  <View style={tailwind('flex flex-row items-center')}>
                     <Text style={[tailwind('text-sm'), typefaces.pm]}>Cantidad: </Text>
                     <Text style={[tailwind('text-sm text-green-600'), typefaces.pm]}>
                        ${amount}
                     </Text>
                  </View>
                  {vehicle && (
                     <View style={tailwind('flex flex-row items-center')}>
                        <Text style={[tailwind('text-sm'), typefaces.pm]}>Placa: </Text>
                        <Text style={[tailwind('text-sm'), typefaces.pr]}>
                           {vehicle.number} {vehicle.alias}
                        </Text>
                     </View>
                  )}
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

const BuyDoneModal = memo(({ show, onCancel, onConfirm }) => {
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
                  <View style={tailwind('p-2')}>
                     <Text style={[typefaces.pr]}>
                        Puede generar el código de la compra ahora, o generarlo luego buscándolo en
                        el menu de compras
                     </Text>
                  </View>
               </View>
               <View style={tailwind('flex flex-row justify-evenly mt-4')}>
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
});

const QRButton = memo(({ onPress, text }) => {
   return (
      <Ripple
         onPress={onPress}
         style={tailwind('rounded-md items-center w-40')}
         rippleColor="#ffffff"
         rippleSize={500}
         rippleDuration={600}
      >
         <View
            style={tailwind(
               'flex flex-row bg-black rounded-md items-center justify-evenly w-full py-2 px-4',
            )}
         >
            <QRIcon />
            <Text style={[tailwind('text-white mt-1'), typefaces.pm]}>{text}</Text>
         </View>
      </Ripple>
   );
});
