import React from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';

import emptyImage from '../../assets/background/empty.png';
import { FULL_HIGHT } from '../../utils/constants';
import Fetch from '../../utils/Fetch';
import { typefaces } from '../../utils/styles';
import { makeCancelable } from '../../utils/utils';
import { formatISODate } from '../buy/utils';
import ArrowLeftDownIcon from '../icons/ArrowLeftDownIcon';
import ArrowUpRightIcon from '../icons/ArrowUpRightIcon';
import TransferIcon from '../icons/TransferIcon';

class TransfersView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         transfers: [],
      };
   }

   componentDidMount() {
      this.setState({ loading: true });
      this.reqTransfers = makeCancelable(
         Fetch.get('/topup/user/transfer/', { all: '1' }),
         (res) => {
            this.setState({ transfers: res.body.transfers, loading: false });
         },
         (err) => {
            this.setState({ loading: false });
            console.error(err);
         },
      );
   }

   componentWillUnmount() {
      if (this.reqTransfers) this.reqTransfers.cancel();
   }

   onAddTransfer = () => {
      this.props.navigation.push('createTransferView');
   };

   render() {
      if (this.state.loading) {
         return (
            <ScrollView>
               <View style={tailwind('p-4 flex flex-row justify-end')}>
                  <IconButton
                     text="Transferir saldo"
                     onPress={this.onAddTransfer}
                     icon={<TransferIcon />}
                  />
               </View>
               <View
                  style={[tailwind('flex justify-center items-center'), { height: FULL_HIGHT / 2 }]}
               >
                  <ActivityIndicator size="large" color="black" animating />
               </View>
            </ScrollView>
         );
      }
      return (
         <ScrollView>
            <View style={tailwind('p-4 flex flex-row justify-end')}>
               <IconButton
                  text="Transferir saldo"
                  onPress={this.onAddTransfer}
                  icon={<TransferIcon />}
               />
            </View>
            <View style={tailwind('flex items-center')}>
               {this.state.transfers.length ? (
                  <TransfersList transfers={this.state.transfers} />
               ) : (
                  <React.Fragment>
                     <EmptyMessage />
                     <IconButton
                        text="Transferir saldo"
                        onPress={this.onAddTransfer}
                        icon={<TransferIcon />}
                     />
                  </React.Fragment>
               )}
            </View>
         </ScrollView>
      );
   }
}

function TransfersList({ transfers }) {
   const user = useSelector((state) => state.user.data);
   return (
      <View style={tailwind('w-full px-4 py-2')}>
         {transfers.map((transfer) => {
            const isReceiver = user.id === transfer.receiver_user.id;
            return (
               <View
                  key={transfer.id}
                  style={tailwind(
                     'flex flex-row justify-between border border-gray-300 rounded-md my-1 px-2 py-2',
                  )}
               >
                  <View style={tailwind('flex flex-row')}>
                     <View style={tailwind('mr-1')}>
                        {isReceiver ? (
                           <ArrowLeftDownIcon stroke="#1ED895" />
                        ) : (
                           <ArrowUpRightIcon stroke="#19ACDA" />
                        )}
                     </View>
                     <View>
                        {isReceiver ? (
                           <Text style={[typefaces.pm]}>
                              Recibido de: {transfer.sender_user.email}
                           </Text>
                        ) : (
                           <Text style={[typefaces.pm]}>
                              Enviado a: {transfer.receiver_user.email}
                           </Text>
                        )}
                        <Text>{formatISODate(transfer.created_at)}</Text>
                     </View>
                  </View>
                  <View>
                     {isReceiver ? (
                        <Text style={tailwind('text-green-600')}>+ ${transfer.amount}</Text>
                     ) : (
                        <Text style={tailwind('text-orange-600')}>- ${transfer.amount}</Text>
                     )}
                  </View>
               </View>
            );
         })}
      </View>
   );
}

function EmptyMessage(props) {
   return (
      <View style={tailwind('items-center mb-12 mt-16')}>
         <View>
            <Image source={emptyImage} style={[tailwind('w-32 h-48')]} />
         </View>
         <View style={tailwind('px-12')}>
            <Text style={[tailwind('text-gray-700 text-lg text-center'), typefaces.pm]}>
               No haz realizado ninguna transferencia de saldo aún.
            </Text>
         </View>
      </View>
   );
}

function IconButton({ onPress, text, icon }) {
   return (
      <Ripple
         style={tailwind(
            'w-48 h-12 py-2 px-5 flex flex-row items-center justify-between border border-gray-700 rounded-md',
         )}
         onPress={onPress}
         rippleCentered
      >
         {icon ? icon : <></>}
         <Text style={[tailwind('text-sm'), typefaces.pm]}>{text}</Text>
      </Ripple>
   );
}

export default TransfersView;
