import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import AddIcon from '../icons/AddIcon';
import add from '../../assets/img/agregar.png';
import VehicleIdItem from './VehicleIdItem';
import AddVehicleIdItemModal from './AddVehicleIdItemModal';
import SimpleToast from 'react-native-simple-toast';
import Ripple from 'react-native-material-ripple';

export default function VehiclesIdInput({ defaultValue = [], onChange, loading }) {
   const [showModal, setShowModal] = React.useState(false);

   function onAdd(item) {
      const valid = validate(item, defaultValue);
      if (!valid) return;
      onChange([...defaultValue, item]);
      setShowModal(false);
   }

   function onDelete(number) {
      onChange(defaultValue.filter((item) => item.number !== number));
   }

   return (
      <View style={tailwind('w-full items-center')}>
         <Text style={tailwind('mb-2')}>Placas de los vehículos</Text>
         <View style={tailwind('flex flex-row')}>
            <View
               style={[
                  tailwind('flex flex-row flex-wrap border border-black rounded-xl w-56 p-1'),
                  defaultValue.length === 0 ? tailwind('border-red-400') : {},
                  { minHeight: 10 },
               ]}
            >
               {loading && <ActivityIndicator animating size="small" color="black" />}
               {!loading &&
                  defaultValue.map((item) => (
                     <VehicleIdItem
                        key={item.number}
                        number={item.number}
                        alias={item.alias}
                        onDelete={() => onDelete(item.number)}
                     />
                  ))}
            </View>
            <Ripple
               onPress={() => setTimeout(() => setShowModal(true), 100)}
               rippleDuration={250}
               style={tailwind('ml-4 flex justify-center items-center')}
               rippleCentered
            >
               <View style={tailwind('flex justify-center items-center')}>
                  <Image source={add} style={tailwind('w-12 h-12')}/>
               </View>
            </Ripple>
         </View>
         <AddVehicleIdItemModal
            onAdd={(item) => onAdd(item)}
            onCancel={() => setShowModal(false)}
            visible={showModal}
            close={() => setShowModal(false)}
         />
      </View>
   );
}

function validate(item, items) {
   if (!item.number) {
      SimpleToast.showWithGravity(
         'Debe escribir un numero de placa',
         SimpleToast.LONG,
         SimpleToast.CENTER,
      );
      return false;
   }

   const exist = items.find(
      (i) => i.number.trim().toLowerCase() === item.number.trim().toLowerCase(),
   );
   if (exist) {
      SimpleToast.showWithGravity(
         'Número de placa duplicado',
         SimpleToast.LONG,
         SimpleToast.CENTER,
      );
      return false;
   }

   return true;
}
