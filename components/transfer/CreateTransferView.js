import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import SimpleToast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import Fetch from '../utils/Fetch';
import { typefaces } from '../utils/styles';
import InfoIcon from '../icons/InfoIcon';
import AddSubInput from '../shared/AddSubInput';
import Button from '../shared/Button';
import InfoIconp from '../../assets/img/popup.png';
import Line from '../shared/Line';
import LoadingModal from '../shared/LoadingModal';
import BalanceSelector from './BalanceSelector';
import UserSelector from './UserSelector';
import LoadingButton from '../shared/LoadingButton';
import AppButton from '../shared/AppButton';

class CreateTransferView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         showReceiver: false,
         showGasStation: false,
         receiverIdentifier: null,
         gasStationBalance: null,
         sending: false,
         amount: 0,
         showConfirm: false,
         showLoading: false,
         showDone: false,
      };
   }

   updateAmount = (amount) => {
      this.setState(() => ({ amount }));
   };

   selectUser = (input) => {
      this.setState({ receiverIdentifier: input });
   };

   selectBalance = (balance) => {
      this.setState({ gasStationBalance: balance });
   };

   trySend = () => {
      const { receiverIdentifier, gasStationBalance, amount } = this.state;
      if (!receiverIdentifier) {
         SimpleToast.show('Seleccionar un usuario');
         return;
      }
      if (!gasStationBalance) {
         SimpleToast.show('Seleccionar una gasolinera.');
         return;
      }
      if (amount < 1) {
         SimpleToast.show('Seleccionar una cantidad válida.');
         return;
      }
      const remaining = gasStationBalance.total - amount;
      if (remaining < 0) {
         SimpleToast.show('Saldo insuficiente');
         return;
      }
      const { cedula, email } = this.props.user;

      if (receiverIdentifier.trim() === cedula || receiverIdentifier.trim() === email) {
         SimpleToast.show('No puedes transferirte a tí mismo');
         return;
      }
      this.setState({ showConfirm: true });
   };

   sendTransfer = () => {
      this.setState({ showConfirm: false, showLoading: true });
      const { gasStationBalance, amount, receiverIdentifier } = this.state;
      Fetch.post('/topup/user/transfer/', {
         receiver: receiverIdentifier,
         amount,
         balance: gasStationBalance,
      })
         .then((res) => {
            console.log(':: res ::', res);
            this.setState({ showLoading: false, showDone: true });
         })
         .catch((err) => {
            console.error(':: err ::', err);
            this.setState({ showLoading: false, showDone: false });
            SimpleToast.show('No se pudo completar la transacción');
         });
      // setTimeout(()=> {
      // 	this.setState({ showLoading: false, showDone: true })
      // }, 600)
   };

   close = () => {
      this.setState({ showDone: false }, () => {
         this.props.navigation.reset({ index: 0, key: null, routes: [{ name: 'home' }] });
      });
   };

   render() {
      const balance = this.state.gasStationBalance;
      const remaining = (balance ? balance.total : 0) - this.state.amount;
      return (
         <View>
            <View style={styles.user.view}>
               <Text style={styles.user.text}>Enviar a:</Text>
               <UserSelector onChange={this.selectUser} />
            </View>
            <Line style={styles.line} />
            <View style={styles.balance.view}>
               <Text style={styles.balance.text}>Gasolinera: </Text>
               <BalanceSelector onChange={this.selectBalance} />
            </View>
            <Line style={styles.line} />
            <View style={styles.remaining.view}>
               <Text style={styles.remaining.text}>Saldo restante: </Text>
               <Text style={styles.remainingStyle(remaining)}>${remaining}</Text>
            </View>
            <Line style={styles.line} />
            <AddSubInput onChange={this.updateAmount} style={styles.addSub.view} />
				{/*
				<View style={styles.button.view}>
               <Button
                  text="Transferir"
                  onPress={this.trySend}
                  style={tailwind('w-40')}
                  viewStyle={tailwind('py-3')}
                  primary
               />
				</View>
				*/}
				<View style={styles.button.view}>
					<LoadingButton
						iconPos={'right'}
						text="Enviar"
						onPress={this.trySend}
						style={tailwind('w-40')}
						loading={this.state.showLoading}
						viewStyle={tailwind('py-3')}
					/>
				</View>
            <ConfirmTransferModal
               show={this.state.showConfirm}
               onConfirm={this.sendTransfer}
               onCancel={() => this.setState({ showConfirm: false })}
               gasStation={balance ? balance : {}}
               amount={this.state.amount}
               userToSend={this.state.receiverIdentifier}
            />
            <LoadingModal show={this.state.showLoading} text="Transfiriendo saldo." />
            <TransferDoneModal show={this.state.showDone} onClose={this.close} />
         </View>
      );
   }
}

const ConfirmTransferModal = memo(
   ({ show, onConfirm, onCancel, gasStation, amount, userToSend }) => {
      return (
         <ReactNativeModal
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
                     <Text style={[tailwind('text-sm ml-4'), typefaces.psb]}>
                        Confirmar Transferencia
                     </Text>
                  </View>
                  <View style={tailwind('p-6')}>
                     <View style={tailwind('flex flex-row items-center')}>
                        <Text style={[tailwind('text-sm'), typefaces.pm]}>Usuario: </Text>
                        <Text style={[tailwind('text-sm'), typefaces.pr]}>{userToSend}</Text>
                     </View>
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
                  </View>
                  <View style={tailwind('flex flex-row justify-evenly mt-8')}>
                     <AppButton
                        text={'Cancelar'}
                        primary={false}
								onPress={onCancel}
								disable={true}
                        style={{ width: 100 }}
                     />
                     <AppButton text={'confirmar'} onPress={onConfirm} style={{ width: 120 }}/>
                  </View>
               </View>
            </View>
         </ReactNativeModal>
      );
   },
);

const TransferDoneModal = ({ show, onClose }) => {
   return (
      <ReactNativeModal
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
                  <Text style={[tailwind('text-sm ml-4'), typefaces.psb]}>
                     Transferencia completa
                  </Text>
               </View>
					<View style={tailwind(' flex flex-row justify-evenly mt-4 ')}>
						<Image source={InfoIconp} style={[tailwind('w-20 h-20')]} />
					</View>
               <View style={tailwind('flex flex-row justify-evenly mt-8')}>
                  <AppButton text={'Aceptar'} onPress={onClose} style={{ width: 100 }} />
               </View>
            </View>
         </View>
      </ReactNativeModal>
   );
};

const styles = {
   user: {
      view: tailwind('p-6'),
      text: [tailwind('text-base mb-1'), typefaces.pm],
   },
   balance: {
      view: tailwind('flex flex-row items-center justify-between p-6'),
      text: [tailwind('text-base'), typefaces.pm],
   },
   remaining: {
      view: tailwind('flex flex-row p-8'),
      text: [tailwind('text-base'), typefaces.pm],
   },
   addSub: {
      view: tailwind('p-6'),
   },
   remainingStyle: (remaining) => [
      tailwind('text-base ml-2'),
      typefaces.pm,
      !remaining || remaining <= 0.0 ? tailwind('text-red-500') : tailwind('text-green-600'),
   ],
   button: {
      view: [tailwind('mt-24 flex items-center')],
   },
   line: { height: 1.5 },
};

export default connect((state) => ({ user: state.user.data }))(CreateTransferView);
