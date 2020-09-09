import React from 'react';
import { View, Text, TextInput } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import AddIcon from '../icons/AddIcon';
import SubstractIcon from '../icons/SubstractIcon';
import { ADD_VALUE_STEP, FLOAT_FIXED_2 } from '../../utils/constants';
import Ripple from 'react-native-material-ripple';

export default function AddSubInput({ onChange }) {
   const [state, dispatch] = React.useReducer(reducer, initialState);

   React.useEffect(() => {
      if (onChange) {
         onChange(state.count || 0);
      }
   }, [state.count]);

   return (
      <View style={tailwind('flex flex-row justify-evenly items-center')}>
         <Ripple onPress={() => dispatch({ type: 'substract' })} rippleCentered>
            <View>
               <SubstractIcon width={45} height={45} />
            </View>
         </Ripple>
         <View
            style={[
               tailwind('border-2 border-gray-600 rounded w-32 h-12 flex flex-row items-center'),
               state.hasError ? tailwind('border-red-400') : {},
            ]}
         >
            <Text style={[tailwind('text-gray-600 ml-4'), typefaces.pm]}>$</Text>
            <TextInput
               value={state.text}
               defaultValue={state.text}
               style={[tailwind('text-gray-900 w-20')]}
               placeholder="10.00"
               keyboardType="numeric"
               onChangeText={(text) => dispatch({ type: 'text', value: text })}
            />
         </View>
         <Ripple onPress={() => dispatch({ type: 'add' })} rippleCentered>
            <View style={tailwind('rounded-full')}>
               <AddIcon width={45} height={45} />
            </View>
         </Ripple>
      </View>
   );
}

const MIN_AMOUNT = 10.0;

const initialState = {
   count: 20.0,
   text: '20',
   hasError: false,
};

const reducer = (state, action) => {
   let newCount;
   switch (action.type) {
      case 'add':
         newCount = state.count + ADD_VALUE_STEP;
         return { ...state, count: newCount, text: newCount.toString() };
      case 'substract':
         newCount = state.count - ADD_VALUE_STEP;
         newCount = newCount >= MIN_AMOUNT ? newCount : MIN_AMOUNT;
         return { ...state, count: newCount, text: newCount.toString() };
      case 'text':
         const newText = action.value.replace(/[\-\,\s]/, '');
         const matches = newText.match(FLOAT_FIXED_2);
      	newCount = parseFloat(matches[0]);
         const hasError = !newText.length || matches[0][matches[0].length-1] === '.';
         return { text: matches[0], count: newCount || 0, hasError: hasError };
      case 'hasError':
         return { ...state, hasError: action.value };
      default:
         throw new Error('there are not default case');
   }
};
