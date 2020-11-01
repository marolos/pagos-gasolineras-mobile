import React from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';

import emptyImage from '../../assets/background/empty.png';
import { FULL_HIGHT } from '../../utils/constants';
import Fetch from '../../utils/Fetch';
import { typefaces } from '../../utils/styles';
import { makeCancelable } from '../../utils/utils';
import TransferIcon from '../icons/TransferIcon';

export default class TransfersView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         transfers: [],
      };
   }

   componentDidMount() {
      this.reqTransfers = makeCancelable(
         Fetch.get('/topup/user/transfer/', { all: '1' }),
         (res) => {
            this.setState({ transfers: res.body.transfers });
         },
         (err) => {
            console.error(err);
         },
      );
   }

   componentWillUnmount() {
      if (this.reqTransfers) this.reqTransfers.cancel();
   }

   onAddTransfer = () => {};

   render() {
      if (this.state.loading) {
         return (
            <ScrollView>
               <View style={[tailwind('flex items-center'), { height: FULL_HIGHT }]}>
                  <ActivityIndicator animating />
               </View>
            </ScrollView>
         );
      }
      return (
         <ScrollView>
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
   return <View></View>;
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
