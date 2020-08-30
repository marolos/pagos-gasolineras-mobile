import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import NextIcon from '../icons/NextIcon';
import tailwind from 'tailwind-rn';
import Line from '../shared/Line';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import { typefaces } from '../../utils/styles';
import AddSubInput from '../shared/AddSubInput';
import { FULL_HIGHT, IVA_RATE, COMMISION } from '../../utils/constants';
import Ripple from 'react-native-material-ripple';
import { makeCancelable } from '../../utils/utils';
import FetchClient from '../../utils/FetchClient';

export default function TopupDataView({ route, navigation }) {
   const [amount, setAmount] = React.useState(0);
   const [hasCards, setHasCards] = React.useState(false);
   const [loaded, setLoaded] = React.useState(false);

   React.useEffect(() => {
      setLoaded(false);
      const request = makeCancelable(
         FetchClient.get('/payment/user/card/'),
         (cards) => {
            setHasCards(cards.result_size !== 0);
            setLoaded(true);
         },
         (err) => {
            setLoaded(true);
         },
      );
      return () => request.cancel();
   }, []);

   function next() {
      const params = { company: route.params, amount: amount };
      if (hasCards) {
         navigation.push('chooseCard', params);
      } else {
         navigation.push('addCard', params);
      }
   }

   return (
      <ScrollView>
         <View style={{ flex: 1, height: FULL_HIGHT - 35 }}>
            <View style={tailwind('p-6')}>
               <Text style={[tailwind('text-base mb-2'), typefaces.pm]}>Facturacion:</Text>
               <View>
                  <Ripple onPress={navigation.goBack}>
                     <View
                        style={tailwind(
                           'border rounded-lg border-gray-400 flex flex-row justify-between px-6 py-4',
                        )}
                     >
                        <Text style={[typefaces.pm]}>{'Manuela canizares'}</Text>
                        <View style={tailwind('flex flex-row items-center')}>
                           <Text style={[typefaces.pm, tailwind('mr-4 ')]}>editar</Text>
                           <ArrowRightIcon />
                        </View>
                     </View>
                  </Ripple>
               </View>
            </View>
            <Line style={tailwind('w-full bg-gray-300 my-2')} />
            <View style={tailwind('p-6')}>
               <View>
                  <Text style={[tailwind('text-base'), typefaces.pm]}>
                     Empresa: {route.params.business_name}
                  </Text>
               </View>
               <View>
                  <Text style={[tailwind('text-base mb-2'), typefaces.pm]}>
                     Cantidad en dolares:
                  </Text>
                  <AddSubInput onChange={(amount) => setAmount(amount)} />
               </View>
            </View>
            <View style={tailwind('p-6')}>
               <Resume amount={amount} />
            </View>
            <View style={tailwind('absolute bottom-0 right-0')}>
               {loaded ? (
                  <LoadingButton
                     icon={<NextIcon />}
                     iconPos={'right'}
                     text="continuar"
                     style={tailwind('w-48 self-end mr-6 mb-6')}
                     onPress={next}
                  />
               ) : (
                  <ActivityIndicator animating color="black" />
               )}
            </View>
         </View>
      </ScrollView>
   );
}

const IVA = 0.12;
const COMISION = 0.25;

export function Resume({ amount, showAmount = false, useGreen = true, extra = null }) {
   const [values, setValues] = React.useState({ subtotal: 0, iva: 0, total: 0 });
   React.useEffect(() => {
      const fraction = amount / (100 + IVA_RATE);
      setValues({
         iva: (IVA_RATE * fraction).toFixed(2),
         subtotal: (100 * fraction).toFixed(2),
         total: amount + COMISION,
      });
   }, [amount]);
   return (
      <View>
         {showAmount && (
            <View style={tailwind('flex flex-row justify-between w-56')}>
               <Text style={[tailwind('text-base'), typefaces.pm]}>Cantidad:</Text>
               <Text style={[tailwind('text-base'), typefaces.pr]}>$ {amount}</Text>
            </View>
         )}
         <View style={tailwind('flex flex-row justify-between w-56')}>
            <Text style={[tailwind('text-base'), typefaces.pm]}>Subtotal:</Text>
            <Text style={[tailwind('text-base'), typefaces.pr]}>$ {values.subtotal}</Text>
         </View>
         <View style={tailwind('flex flex-row justify-between w-56')}>
            <Text style={[tailwind('text-base'), typefaces.pm]}>IVA (12%):</Text>
            <Text style={[tailwind('text-base'), typefaces.pr]}>
               $ {values.iva}
            </Text>
         </View>
         <View style={tailwind('flex flex-row justify-between w-56')}>
            <Text style={[tailwind('text-base'), typefaces.pm]}>Comision:</Text>
            <Text style={[tailwind('text-base'), typefaces.pr]}>$ 0.25</Text>
         </View>
         <View style={tailwind('flex flex-row justify-between w-56')}>
            <Text style={[tailwind('text-base'), typefaces.pm]}>Total a pagar:</Text>
            <Text
               style={[
                  tailwind('text-base'),
                  useGreen ? tailwind('text-green-600') : tailwind('text-black'),
                  useGreen ? typefaces.psb : typefaces.pb,
               ]}
            >
               $ {values.total}
            </Text>
         </View>
         {extra && (
            <View style={tailwind('flex flex-row justify-between w-56')}>
               <Text style={[tailwind('text-base'), typefaces.pm]}>{extra.label}:</Text>
               <Text style={[tailwind('text-base'), typefaces.pr]}>{extra.value}</Text>
            </View>
         )}
      </View>
   );
}
