import React from 'react';
import { View, TextInput } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import tailwind from 'tailwind-rn';

function AddCardView(props) {
   return (
      <View style={{ flex: 1 }}>
         <View>
            <CardNumberInput />
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

function CardNumberInput({ onChange }) {
   const [text, setText] = React.useState('');
   return (
      <View>
         <View></View>
         <TextInput
            value={text}
            placeholder="numero de tarjeta"
            onChangeText={(text) => {
               setText(text);
            }}
         />
      </View>
   );
}

export default AddCardView;
