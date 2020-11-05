import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH } from '../utils/constants';
import { typefaces } from '../utils/styles';
import { formatISODate, generateQR } from './utils';

export default function GenerateCodeView({ navigation, route }) {
   const [loading, setLoading] = React.useState(false);
   const [data, setData] = React.useState({});

   React.useEffect(() => {
		setLoading(true);
      generateQR(route.params.qrcode_string)
         .then((url) => {
            setData({ ...route.params, qrcode: url });
         })
         .catch((err) => {
            console.error(err);
         })
         .finally(() => {
            setTimeout(() => setLoading(false), 200);
         });
   }, []);

   return (
      <View style={tailwind('flex items-center')}>
         <View style={tailwind('mt-6')}>
            <View style={tailwind('flex flex-row')}>
               <Text style={[tailwind('text-base'), typefaces.pr]}>Cantidad: </Text>
               <Text style={[tailwind('text-base text-green-600'), typefaces.pm]}>
                  ${route.params.amount}
               </Text>
            </View>
            <View style={tailwind('flex flex-row')}>
               <Text style={[tailwind('text-base'), typefaces.pr]}>Expiración: </Text>
               <Text style={[tailwind('text-base text-gray-800'), typefaces.pm]}>
                  {formatISODate(route.params.code_expiry_date)}
               </Text>
            </View>
         </View>
         <View style={tailwind('flex flex-row justify-center')}>
            {loading ? (
               <ActivityIndicator size="large" color="black" animating />
            ) : (
               <Image
                  source={{ uri: data.qrcode }}
                  style={{ width: FULL_WIDTH - 50, height: FULL_WIDTH - 50 }}
               />
            )}
         </View>
         <View style={tailwind('flex items-center mt-4')}>
            <Text style={[tailwind('text-base text-gray-700'), typefaces.pm]}>
               Código numérico de la compra:
            </Text>
            <Text style={[tailwind('text-xl text-gray-800'), typefaces.pm]}>
               {route.params.number_code}
            </Text>
         </View>
      </View>
   );
}
