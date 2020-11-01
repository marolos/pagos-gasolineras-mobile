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
import { connect } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import Fetch from '../../utils/Fetch';

function TopupDataView({ route, navigation, user }) {
   const [amount, setAmount] = React.useState(0);
   const [hasCards, setHasCards] = React.useState(false);
	const [loaded, setLoaded] = React.useState(false);

   React.useEffect(() => {
      setLoaded(false);
      const request = makeCancelable(
         Fetch.get('/payment/user/card/'),
         ({ body }) => {
            setHasCards(body.cards.result_size !== 0);
            setLoaded(true);
         },
         (err) => {
            console.error('reject::::', err);
            if (err.isCanceled) return;
            setLoaded(true);
         },
      );
      return () => request.cancel();
   }, []);

   function next() {
      if (amount < 10) {
         SimpleToast.showWithGravity(
            'Ingrese una cantidad mayor o igual a $10',
            SimpleToast.LONG,
            SimpleToast.CENTER,
         );
         return;
      }
      const { gas_station, company } = route.params;
      const params = { company, gas_station, amount };
      if (hasCards) {
         navigation.push('chooseCard', params);
      } else {
         navigation.push('addCard', params);
      }
   }

   return (
      <ScrollView>
         <View style={styles.main}>
            <View style={styles.billing.container}>
               <Text style={styles.billing.text}>Facturacion:</Text>
               <View>
                  <Ripple onPress={navigation.goBack}>
                     <View style={styles.billing.buttonContainer}>
                        <Text style={[typefaces.pm]}>
                           {user.first_name} {user.last_name}
                        </Text>
                        <View style={styles.billing.arrowContainer}>
                           <Text style={styles.billing.arrowText}>editar</Text>
                           <ArrowRightIcon />
                        </View>
                     </View>
                  </Ripple>
               </View>
            </View>
            <Line style={styles.line} />
            <View style={styles.billing.container}>
               <View>
                  <Text style={[tailwind('text-base'), typefaces.pm]}>
                     Gasolinera: {route.params.gas_station.name}
                  </Text>
               </View>
               <View>
                  <Text style={styles.billing.text}>Cantidad en dolares:</Text>
                  <AddSubInput onChange={setAmount} />
               </View>
            </View>
            <View style={styles.billing.container}>
               <Resume amount={amount} />
            </View>
            <View style={tailwind('absolute bottom-0 right-0')}>
               {loaded ? (
                  <LoadingButton
                     icon={<NextIcon />}
                     iconPos={'right'}
                     text="continuar"
                     style={tailwind('w-48 self-end mr-6 mb-12')}
                     onPress={() => next()}
                  />
               ) : (
                  <ActivityIndicator animating color="black" />
               )}
            </View>
         </View>
      </ScrollView>
   );
}

export function Resume({ amount, showAmount = false, useGreen = true, extra = null }) {
   const [values, setValues] = React.useState({ subtotal: 0, iva: 0, total: 0 });

   React.useEffect(() => {
      const fraction = amount / (100 + IVA_RATE);
      setValues({
         iva: (IVA_RATE * fraction).toFixed(2),
         subtotal: (100 * fraction).toFixed(2),
         total: amount + COMMISION,
      });
   }, [amount]);

   return (
      <View>
         {showAmount && (
            <View style={styles.section.container}>
               <Text style={styles.section.textm}>Cantidad:</Text>
               <Text style={styles.section.textr}>$ {amount}</Text>
            </View>
         )}
         <View style={styles.section.container}>
            <Text style={styles.section.textm}>Subtotal:</Text>
            <Text style={styles.section.textr}>$ {values.subtotal}</Text>
         </View>
         <View style={styles.section.container}>
            <Text style={styles.section.textm}>IVA (12%):</Text>
            <Text style={styles.section.textr}>$ {values.iva}</Text>
         </View>
         <View style={styles.section.container}>
            <Text style={styles.section.textm}>Comision:</Text>
            <Text style={styles.section.textr}>$ 0.25</Text>
         </View>
         <View style={styles.section.container}>
            <Text style={styles.section.textr}>Total a pagar:</Text>
            <Text style={styles.section.total(useGreen)}>$ {values.total}</Text>
         </View>
         {extra && (
            <View style={styles.section.container}>
               <Text style={styles.section.textm}>{extra.label}:</Text>
               <Text style={styles.section.textr}>{extra.value}</Text>
            </View>
         )}
      </View>
   );
}

const styles = {
   main: { flex: 1, height: FULL_HIGHT - 40 },
   billing: {
      container: tailwind('p-6'),
      text: [tailwind('text-base mb-2'), typefaces.pm],
      buttonContainer: tailwind(
         'border rounded-lg border-gray-400 flex flex-row justify-between px-6 py-4',
      ),
      arrowContainer: tailwind('flex flex-row items-center'),
      arrowText: [typefaces.pm, tailwind('mr-4 ')],
   },
   line: tailwind('w-full bg-gray-300 my-2'),
   section: {
      container: tailwind('flex flex-row justify-between w-56'),
      textm: [tailwind('text-base'), typefaces.pm],
      textr: [tailwind('text-base'), typefaces.pr],
      total: (useGreen) => [
         tailwind('text-base'),
         useGreen ? tailwind('text-green-600') : tailwind('text-black'),
         useGreen ? typefaces.psb : typefaces.pb,
      ],
   },
};

export default connect((state) => ({ user: state.user.data }))(TopupDataView);
