import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import AddIcon from '../icons/AddIcon';
import VehicleIdItem from './VehicleIdItem';
import AddVehicleIdItemModal from './AddVehicleIdItemModal';

export default function VehiclesIdInput({ items, onChange, loading }) {
   const [showModal, setShowModal] = React.useState(false);

   const onAdd = React.useCallback((item) => {
      onChange([...items, item]);
      setShowModal(false);
   });

   const onDelete = (number) => {
      onChange(items.filter((item) => item.number !== number));
   };

   return (
      <View style={tailwind('w-full items-center')}>
         <Text style={tailwind('mb-2')}>Placas de los vehiculos</Text>
         <View style={tailwind('flex flex-row')}>
            <View
               style={[
                  tailwind('flex flex-row flex-wrap border-2 border-gray-600 rounded-md w-56'),
                  { minHeight: 10 },
               ]}
            >
               {loading && <ActivityIndicator animating size="small" color="black" />}
               {!loading &&
                  items.map((item) => (
                     <VehicleIdItem
                        key={item.number}
                        {...item}
                        onDelete={() => onDelete(item.number)}
                     />
                  ))}
            </View>
            <TouchableOpacity
               activeOpacity={0.8}
               delayPressIn={0}
               onPress={() => setShowModal(true)}
            >
               <View style={tailwind('ml-4 mt-1')}>
                  <AddIcon />
               </View>
            </TouchableOpacity>
         </View>
         <AddVehicleIdItemModal
            onAdd={onAdd}
            onCancel={() => setShowModal(false)}
            visible={showModal}
            close={() => setShowModal(false)}
         />
      </View>
   );
}
