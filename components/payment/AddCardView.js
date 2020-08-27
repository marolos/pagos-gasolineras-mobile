import React from 'react';
import { View, TextInput, Text } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import tailwind from 'tailwind-rn';
import NextIcon from '../icons/NextIcon';
import { typefaces } from '../../utils/styles';
import { formatExpiryDate } from '../../utils/utils';
import CardNumberInput from '../shared/CardNumberInput';
import CheckBox from '../shared/CheckBox';
import { connect } from 'react-redux';

const initialState = {
   cardNumber: '',
   cvv: '',
   expiry: '',
   name: '',
   save: false,
};
const reducer = (state, action) => {
   switch (action.type) {
      case 'card_number':
         return { ...state, cardNumber: action.value };
      case 'expiry':
         return { ...state, expiry: action.value };
      case 'cvv':
         return { ...state, cvv: action.value };
      case 'name':
         return { ...state, name: action.value };
      case 'save':
         return { ...state, save: action.value };
   }
};

function AddCardView({ navigation, route, user }) {
   const [state, dispatch] = React.useReducer(reducer, initialState);
   function onNext() {
      console.log(':::  AddCardView  :::', state, user, route.params);
   }
   return (
      <View style={[{ flex: 1 }, tailwind('p-8')]}>
         <View>
            <Text style={[tailwind('ml-2 text-sm'), typefaces.pm]}>Nombre del titular:</Text>
            <CustomInput
               maxLength={100}
               containerStyle={tailwind('w-full')}
               inputStyle={tailwind('w-64')}
               placeholder="Ingresar nombre"
               onChange={(text) => dispatch({ type: 'name', value: text })}
            />
         </View>
         <View style={tailwind('mt-4')}>
            <Text style={[tailwind('ml-2 text-sm'), typefaces.pm]}>
               Tarjeta de crédito o débito:
            </Text>
            <CardNumberInput
               onChange={(text) => dispatch({ type: 'card_number', value: text })}
            />
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
                  onChange={(text) => dispatch({ type: 'cvv', value: text })}
               />
            </View>
            <View style={tailwind('w-1/2')}>
               <Text style={[tailwind('ml-2 text-sm'), typefaces.pm]}>Expiración: </Text>
               <CustomInput
                  maxLength={5}
                  containerStyle={tailwind('w-full')}
                  format={(currentText, text) => formatExpiryDate(currentText, text)}
                  inputStyle={tailwind('w-20')}
                  placeholder="mm/aa"
                  keyboardType="numeric"
                  onChange={(text) => dispatch({ type: 'expiry', value: text })}
               />
            </View>
         </View>
         <View style={tailwind('flex flex-row justify-end mt-12')}>
            <Text style={[tailwind('mr-2'), typefaces.pm]}>Guardar la tarjeta</Text>
            <CheckBox
               onChange={(value) => dispatch({ type: 'save', value: value })}
               defaultValue={state.save}
            />
         </View>
         <View style={tailwind('absolute bottom-0 right-0')}>
            <LoadingButton
               icon={<NextIcon />}
               iconPos={'right'}
               text="continuar"
               style={tailwind('w-48 self-end mr-6 mb-6')}
               onPress={() => {
                  onNext();
                  navigation.goBack();
               }}
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

export default connect((state) => ({ user: state.user.data }))(AddCardView);
