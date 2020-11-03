import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import Modal from 'react-native-modal';

const LoadingModal = memo(({ show, text }) => {
   return (
      <Modal
         isVisible={show}
         animationIn="fadeIn"
         animationOut="fadeOut"
         backdropTransitionOutTiming={0}
         style={tailwind('flex items-center')}
      >
         <View style={tailwind('w-full bg-white rounded-lg')}>
            <View style={tailwind('p-6 rounded-md')}>
               <Text style={[tailwind('text-base'), typefaces.pm]}>{text}</Text>
               <View style={tailwind('h-32 flex flex-row justify-center')}>
                  <ActivityIndicator color="black" size="large" animating />
               </View>
            </View>
         </View>
      </Modal>
   );
});

export default LoadingModal;
