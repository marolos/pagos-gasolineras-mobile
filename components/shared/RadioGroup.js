import React from 'react'
import { 
   View 
} from "react-native";
import RadioButton from './RadioButton'
import tailwind from 'tailwind-rn';

export default function RadioGroup({radios, onCheck, initValue}){
   return(
      <View style={tailwind('flex flex-row')}>
         {radios.map((radio, _) => 
         <View key={radio.value}>
            <RadioButton item={radio} active={radio.value == initValue} onCheck={onCheck}/>
         </View>
         )}
      </View>
   );
}

