import React from 'react';
import { View, Text, Keyboard } from 'react-native';
import BasicInput from '../shared/BasicInput';
import Button from '../shared/AppButton';
import Modal from 'react-native-modal';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import { randomInt } from '../utils/utils';

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
         <View style={styles.view}>
            <Text style={[typefaces.psb, tailwind('text-lg mb-5')]}>Agregar nuevo N° de placa</Text>
            <BasicInput
               placeholder="Número"
               style={styles.input}
               onChange={(text) => setItem({ ...item, number: text })}
               onEndEditing={(text) => setItem({ ...item, number: text })}
               validate={(text) => text && text.length > 1}
            />
            <BasicInput
               placeholder="Alias (opcional)"
               style={styles.input2}
               onChange={(text) => setItem({ ...item, alias: text })}
               onEndEditing={(text) => setItem({ ...item, alias: text })}
            />
            <View style={styles.options}>
					<Button text="Cancelar" 
					onPress={onCancel} 
					style={styles.button} 
					primary={false}
					disable={true} />
               <Button
                  text="Agregar"
                  onPress={() => {
                     Keyboard.dismiss();
                     onAdd({ ...item, id: randomInt() });
                  }}
                  style={styles.button}
               />
            </View>
         </View>
      </Modal>
   );
}

const styles = {
   view: tailwind('bg-white rounded-lg py-8 px-6 items-center'),
   input: tailwind('w-56 mt-2 mb-1'),
   input2: tailwind('w-56 mt-1 mb-4'),
   options: tailwind('w-full flex flex-row justify-evenly mt-4'),
   button: tailwind('w-32'),
};
