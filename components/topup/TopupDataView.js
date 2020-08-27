import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import NextIcon from '../icons/NextIcon';
import tailwind from 'tailwind-rn';
import Line from '../shared/Line';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import { typefaces } from '../../utils/styles';
import AddSubInput from '../shared/AddSubInput';
import { FULL_HIGHT } from '../../utils/constants';

export default function TopupDataView({ route, navigation }) {
   const [amount, setAmount] = React.useState(0);
   function onChangeAmount(amount) {
      setAmount(amount);
	}

   return (
      <ScrollView>
         <View style={{ flex: 1, height: FULL_HIGHT - 35 }}>
            <View style={tailwind('p-6')}>
               <Text style={[tailwind('text-base mb-2'), typefaces.pm]}>Facturacion:</Text>
               <View>
                  <GoEditButton navigation={navigation} />
               </View>
            </View>
            <Line style={tailwind('w-full bg-gray-300 my-2')} />
            <View style={tailwind('p-6')}>
               <View>
                  <Text style={[tailwind('text-base'), typefaces.pm]}>Empresa:  {route.params.business_name}</Text>
               </View>
               <View>
                  <Text style={[tailwind('text-base mb-2'), typefaces.pm]}>
                     Cantidad en dolares:
                  </Text>
                  <AddSubInput onChange={onChangeAmount} />
               </View>
            </View>
            <View style={tailwind('p-6')}>
               <Resume amount={amount} />
            </View>
            <View style={tailwind('absolute bottom-0 right-0')}>
               <LoadingButton
                  icon={<NextIcon />}
                  iconPos={'right'}
                  text="continuar"
                  style={tailwind('w-48 self-end mr-6 mb-6')}
                  onPress={() =>
                     navigation.push('chooseCard', { company: route.params, amount: amount })
                  }
               />
            </View>
         </View>
      </ScrollView>
   );
}

const IVA = 0.12;
const COMISION = 0.25;

function Resume({ amount }) {
   const [values, setValues] = React.useState({ subtotal: 0, iva: 0, total: 0 });
   React.useEffect(() => {
      const iva = amount * IVA;
      setValues({
         iva: iva,
         subtotal: amount - iva,
         total: amount + COMISION,
      });
   }, [amount]);
   return (
      <View>
         <View style={tailwind('flex flex-row justify-between w-56')}>
            <Text style={[tailwind('text-base'), typefaces.pm]}>Subtotal:</Text>
            <Text style={[tailwind('text-base'), typefaces.pr]}>$ {values.subtotal}</Text>
         </View>
         <View style={tailwind('flex flex-row justify-between w-56')}>
            <Text style={[tailwind('text-base'), typefaces.pm]}>IVA (12%):</Text>
            <Text style={[tailwind('text-base'), typefaces.pr]}>
               $ {values.iva.toFixed(2)}
            </Text>
         </View>
         <View style={tailwind('flex flex-row justify-between w-56')}>
            <Text style={[tailwind('text-base'), typefaces.pm]}>Comision:</Text>
            <Text style={[tailwind('text-base'), typefaces.pr]}>$ 0.25</Text>
         </View>
         <View style={tailwind('flex flex-row justify-between w-56')}>
            <Text style={[tailwind('text-base'), typefaces.pm]}>Total a pagar:</Text>
            <Text style={[tailwind('text-base text-green-600'), typefaces.psb]}>$ {values.total}</Text>
         </View>
      </View>
   );
}

function GoEditButton({ navigation }) {
   return (
      <TouchableOpacity delayPressIn={0} activeOpacity={0.6} onPress={navigation.goBack}>
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
      </TouchableOpacity>
   );
}
