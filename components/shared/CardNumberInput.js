import React from 'react';
import { View, TextInput, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import CardIcon from '../icons/CardIcon';
import { createStringChunks } from '../../utils/utils';
import { VISA_REGEX, MASTERCARD_REGEX, AMEX_REGEX } from '../../utils/constants';
import { getCardLogo } from '../payment/CardItem';
import CardColorIcon from '../icons/CardColorIcon';

function CardNumberInput({ onChange }) {
   const [text, setText] = React.useState('');
   const [editing, setEditing] = React.useState(false);
   React.useEffect(() => {
      if (onChange) onChange(text);
   }, [text]);
   return (
      <View
         style={[
            tailwind('flex flex-row items-center'),
            tailwind('rounded-md border-2 border-gray-200 pl-4 w-full'),
            editing ? tailwind('bg-white border-2 border-gray-600') : tailwind('bg-gray-200'),
         ]}
      >
         <View style={tailwind('mr-2 w-8')}>{getCardProviderLogo(text)}</View>
         <TextInput
            value={text}
            keyboardType="numeric"
            placeholder="numero"
            maxLength={19}
            onChangeText={(text) => {
               if (text) setText(createStringChunks(text, 4).join(' '));
               else setText(text);
            }}
            onEndEditing={(e) => setEditing(false)}
            style={[tailwind('w-56 text-base')]}
            onFocus={(e) => setEditing(true)}
         />
      </View>
   );
}

const imgStyle = { width: 30, resizeMode: 'contain' };

function getCardProviderLogo(text) {
   if (!text || text.length === 0) return <CardColorIcon />;
   const copyText = text.replace(/\s/g, '');
   if (VISA_REGEX.test(copyText)) return <Image style={imgStyle} source={getCardLogo('vi')} />;
   if (MASTERCARD_REGEX.test(copyText))
      return <Image style={imgStyle} source={getCardLogo('mc')} />;
   if (AMEX_REGEX.test(copyText))
      return <Image style={{ width: 30, height: 18 }} source={getCardLogo('ax')} />;

   return <CardColorIcon />;
}

export default CardNumberInput;
