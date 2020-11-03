import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image';

function BalanceCard({ total, company, gasStation, onPress }) {
   return (
      <Ripple onPress={onPress} style={styles.ripple} rippleDuration={300}>
         <View style={styles.view}>
            <FastImage source={{ uri: company.company_logo_path }} style={styles.image} />
            <View>
               <Text style={styles.name}>{gasStation.name}</Text>
               <View style={tailwind('flex flex-row')}>
                  <Text style={styles.totalText}>Saldo:</Text>
                  <Text style={total > 5 ? styles.total1 : styles.total0}>${total}</Text>
               </View>
            </View>
         </View>
      </Ripple>
   );
}

const styles = {
   ripple: tailwind('m-2'),
   view: tailwind('flex flex-row rounded-md py-2 px-3 border border-gray-300'),
   image: { width: 40, height: 40, marginRight: 15 },
   line: tailwind('bg-gray-300 w-full mt-2 mb-1'),
   name: [tailwind('text-black text-base'), typefaces.psb],
	totalText: [tailwind('text-gray-700 text-xs mr-1'), typefaces.pm],
	total0:  [tailwind('text-gray-600 text-xs'), typefaces.pm],
   total1: [tailwind('text-green-600 text-xs'), typefaces.pm],
};

export default BalanceCard;
