import React from 'react';
import { View, Text, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import visaLogo from '../../assets/images/visa.png';
import mastercardLogo from '../../assets/images/mastercard.png';
import amexLogo from '../../assets/images/amex.png';
import dinersLogo from '../../assets/images/diners.png';
import discoverLogo from '../../assets/images/discover.png';
import maestroLogo from '../../assets/images/maestro.png';
import { typefaces } from '../../utils/styles';
import RadioIcon from '../icons/RadioIcon';

export default function CardItem({ holderName, type, onPress, selected }) {
   return (
      <Ripple
         rippleColor="#718096"
         onPress={onPress}
         style={[
            tailwind(
               'flex flex-row justify-between items-center bg-white border rounded-lg mb-3 px-3 h-12',
            ),
            selected ? tailwind('border-gray-400') : tailwind('border-gray-200'),
         ]}
      >
         <View style={tailwind('flex flex-row items-center')}>
            <Image source={getCardLogo(type)} style={{ width: 30, resizeMode: 'contain' }} />
            <Text style={[tailwind('ml-3 mt-1'), typefaces.pm]}>{holderName}</Text>
         </View>
         <View style={tailwind('mr-1 mt-1 items-center')}>
            <RadioIcon selected={selected} />
         </View>
      </Ripple>
   );
}

export function getCardLogo(type) {
   switch (type.toLowerCase()) {
      case 'vi':
         return visaLogo;
      case 'mc':
         return mastercardLogo;
      case 'ax':
         return amexLogo;
      case 'di':
         return dinersLogo;
      case 'dc':
         return discoverLogo;
      case 'ms':
         return maestroLogo;
      default:
         return visaLogo;
   }
}