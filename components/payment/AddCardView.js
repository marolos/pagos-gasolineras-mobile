import React from 'react';
import { View, TextInput, Text } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import tailwind from 'tailwind-rn';
import NextIcon from '../icons/NextIcon';
import { typefaces } from '../../utils/styles';
import { formatExpiryDate } from '../../utils/utils';
import CardNumberInput from '../shared/CardNumberInput';

function AddCardView(props) {
   return (
      <View style={[{ flex: 1 }, tailwind('p-8')]}>
         <View>
            <Text style={[tailwind('ml-2 text-sm'), typefaces.pm]}>
               Nombre del titular de la tarjeta:
            </Text>
            <CustomInput
               maxLength={100}
               containerStyle={tailwind('w-full')}
               inputStyle={tailwind('w-64')}
               placeholder="Ingresar nombre"
               onChange={() => {}}
            />
         </View>
         <View style={tailwind('mt-4')}>
            <Text style={[tailwind('ml-2 text-sm'), typefaces.pm]}>
               Tarjeta de credito o debito:
            </Text>
            <CardNumberInput />
         </View>
         <View style={tailwind('flex flex-row justify-between mt-4')}>
            <View style={tailwind('w-2/5')}>
               <Text style={[tailwind('ml-2 text-sm'), typefaces.pm]}>CVV: </Text>
               <CustomInput
                  maxLength={3}
                  containerStyle={tailwind('w-full')}
                  inputStyle={tailwind('w-12')}
                  placeholder="cvv"
                  keyboardType="numeric"
               />
            </View>
            <View style={tailwind('w-1/2')}>
               <Text style={[tailwind('ml-2 text-sm'), typefaces.pm]}>Expiracion: </Text>
               <CustomInput
                  maxLength={5}
                  containerStyle={tailwind('w-full')}
                  onChange={() => {}}
                  format={(currentText, text) => formatExpiryDate(currentText, text)}
                  inputStyle={tailwind('w-20')}
                  placeholder="mm/aa"
                  keyboardType="numeric"
               />
            </View>
         </View>

         <View style={tailwind('absolute bottom-0 right-0')}>
            <LoadingButton
               icon={<NextIcon />}
               iconPos={'right'}
               text="continuar"
               style={tailwind('w-48 self-end mr-6 mb-6')}
               onPress={() => props.navigation.goBack()}
            />
         </View>
      </View>
   );
}

function CustomInput({
   onChange,
   maxLength,
   containerStyle,
   inputStyle,
   placeholder,
   keyboardType,
   format,
}) {
   const [currentText, setCurrentText] = React.useState('');
   const [editing, setEditing] = React.useState(false);
   return (
      <View
         style={[
            tailwind('rounded-md border-2 border-gray-200 pl-4'),
            containerStyle ? containerStyle : {},
            editing ? tailwind('bg-white border-2 border-gray-600') : tailwind('bg-gray-200'),
         ]}
      >
         <TextInput
            value={currentText}
            keyboardType={keyboardType || 'default'}
            placeholder={placeholder}
            maxLength={maxLength || 200}
            onChangeText={(text) => {
               if (format) text = format(currentText, text);
               if (onChange) onChange(text);
               setCurrentText(text);
            }}
            style={[tailwind('w-12 text-base'), inputStyle ? inputStyle : {}]}
            onFocus={(e) => setEditing(true)}
            onEndEditing={(e) => setEditing(false)}
         />
      </View>
   );
}

export default AddCardView;
