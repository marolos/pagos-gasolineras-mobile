import React from 'react';
import { View, Text, Keyboard } from 'react-native';
import BasicInput from '../shared/BasicInput';
import Button from '../shared/Button';
import Modal from 'react-native-modal';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import { randomInt } from '../../utils/utils';

export default function AddVehicleIdItemModal({ onAdd, onCancel, visible, close }) {
   const [item, setItem] = React.useState({
      number: '',
      alias: '',
   });
   return (
      <Modal
         isVisible={visible}
         testID={'modalvid'}
         animationIn="fadeIn"
         animationOut="fadeOut"
         swipeDirection={['down']}
         onSwipeComplete={close}
         backdropTransitionOutTiming={0}
      >
         <View style={tailwind('bg-white rounded-lg p-6 items-center')}>
            <Text style={[typefaces.psb]}>Agregar nuevo numero de placa.</Text>
            <BasicInput
               placeholder="Numero"
               style={tailwind('w-56 mt-2 mb-1')}
               onChange={(text) => setItem({ ...item, number: text })}
               onEndEditing={(text) => setItem({ ...item, number: text })}
               validate={(text) => text && text.length > 1}
            />
            <BasicInput
               placeholder="Alias (opcional)"
               style={tailwind('w-56 mt-1 mb-2')}
               onChange={(text) => setItem({ ...item, alias: text })}
               onEndEditing={(text) => setItem({ ...item, alias: text })}
            />
            <View style={tailwind('w-full flex flex-row justify-evenly mt-4')}>
               <Button
                  text="cancelar"
                  onPress={onCancel}
                  style={tailwind('w-2/5')}
                  primary={false}
               />
               <Button
                  text="agregar"
                  onPress={() => {
							Keyboard.dismiss()
                     onAdd({ ...item, id: randomInt() });
                  }}
                  style={tailwind('w-2/5')}
               />
            </View>
         </View>
      </Modal>
   );
}
