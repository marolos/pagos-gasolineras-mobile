import React from 'react';
import { View, Text, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import visaLogo from '../../assets/images/visa.png';
import mastercardLogo from '../../assets/images/mastercard.png';
import amexLogo from '../../assets/images/amex.png';
import { shadowStyle, typefaces } from '../../utils/styles';

export default function CardItem({ alias, type, onPress }) {
   return (
      <Ripple
         rippleColor="#718096"
         onPress={onPress}
         style={[
            tailwind(
               'flex flex-row justify-between items-center bg-white rounded-lg mb-3 px-3 h-12',
            ),
            shadowStyle,
         ]}
      >
         <View style={tailwind('flex flex-row items-center')}>
            <Image source={getCardLogo(type)} style={{ width: 30, resizeMode: 'contain' }} />
            <Text style={[tailwind('ml-3 mt-1'), typefaces.pm]}>{alias}</Text>
         </View>
         <View style={tailwind('mr-4')}>
            <Text>x</Text>
         </View>
      </Ripple>
   );
}

export function getCardLogo(type) {
   switch (type.toLowerCase()) {
      case 'visa':
         return visaLogo;
      case 'mastercard':
         return mastercardLogo;
      case 'amex':
         return amexLogo;
      default:
         return visaLogo;
   }
}
