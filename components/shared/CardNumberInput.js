import React from 'react';
import { View, TextInput, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import { createStringChunks } from '../utils/utils';
import { VISA_REGEX, MASTERCARD_REGEX, AMEX_REGEX } from '../utils/constants';
import { getCardLogo } from '../payment/CardItem';
import CardColorIcon from '../icons/CardColorIcon';

function CardNumberInput({ onChange }) {
   const [text, setText] = React.useState('');
   const [editing, setEditing] = React.useState(false);
   React.useEffect(() => {
      if (onChange) onChange(text);
   }, [text]);
   return (
      <View style={[styles.view, editing ? styles.editing : styles.noEdit]}>
         <View style={styles.icon}>{getCardProviderLogo(text)}</View>
         <TextInput
            value={text}
            keyboardType="numeric"
            placeholder="número"
            maxLength={19}
            onChangeText={(t) => {
               if (t) setText(createStringChunks(t, 4).join(' '));
               else setText(t);
            }}
            onEndEditing={(e) => setEditing(false)}
            style={styles.input}
            onFocus={(e) => setEditing(true)}
         />
      </View>
   );
}

const styles = {
   img: { width: 30, resizeMode: 'contain' },
   view: tailwind('flex flex-row items-center rounded-3xl border border-black w-64 pl-5 bg-white w-full'),
   editing: tailwind('bg-white border-2 border-gray-600'),
   noEdit: tailwind('bg-white'),
   icon: tailwind('mr-2 w-8'),
   input: [tailwind('w-56 text-base')],
};

function getCardProviderLogo(text) {
   if (!text || text.length === 0) return <CardColorIcon />;
   const copyText = text.replace(/\s/g, '');
   if (VISA_REGEX.test(copyText)) return <Image style={styles.img} source={getCardLogo('vi')} />;
   if (MASTERCARD_REGEX.test(copyText))
      return <Image style={styles.img} source={getCardLogo('mc')} />;
   if (AMEX_REGEX.test(copyText))
      return <Image style={{ width: 30, height: 18 }} source={getCardLogo('ax')} />;

   return <CardColorIcon />;
}

export default CardNumberInput;
