import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH } from '../utils/constants';
import { formatISODate } from '../utils/dateUtils';
import { typefaces } from '../utils/styles';
import { generateQR } from './utils';

export default function GenerateCodeView({ route }) {
   const { params } = route;
   const [loading, setLoading] = React.useState(true);
   const [qr, setQr] = React.useState('');

   React.useEffect(() => {
      generateQR(params.qrcode_string)
         .then((urlImg) => setQr(urlImg))
         .catch((err) => console.error(err))
         .finally(() => {
            setTimeout(() => setLoading(false), 300);
         });
   }, []);

   return (
      <View style={tailwind('flex items-center')}>
         <View style={tailwind('mt-6')}>
            <View style={tailwind('flex flex-row')}>
               <Text style={[tailwind('text-base'), typefaces.pr]}>Cantidad: </Text>
               <Text style={[tailwind('text-base text-green-600'), typefaces.pm]}>
                  ${params.amount}
               </Text>
            </View>
            <View style={tailwind('flex flex-row')}>
               <Text style={[tailwind('text-base'), typefaces.pr]}>Expiración: </Text>
               <Text style={[tailwind('text-base text-gray-800'), typefaces.pm]}>
                  {formatISODate(params.code_expiry_date)}
               </Text>
            </View>
         </View>
         <View style={tailwind('flex flex-row justify-center')}>
            {loading ? (
               <ActivityIndicator size="large" color="black" animating />
            ) : (
               <Image
                  source={{ uri: qr }}
                  style={{ width: FULL_WIDTH - 50, height: FULL_WIDTH - 50 }}
               />
            )}
         </View>
         <View style={tailwind('flex items-center mt-4')}>
            <Text style={[tailwind('text-base text-gray-700'), typefaces.pm]}>
               Código numérico de la compra:
            </Text>
            <Text style={[tailwind('text-xl text-gray-800'), typefaces.pm]}>
               {params.number_code}
            </Text>
         </View>
      </View>
   );
}
