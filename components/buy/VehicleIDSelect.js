import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import Fetch from '../utils/Fetch';
import { shadowStyle, typefaces } from '../utils/styles';
import AnimatedArrowIcon from '../icons/AnimatedArrowIcon';
import { info_text } from '../utils/colors';

export default function VehicleIDSelect({ onChange }) {
   const [selected, setSelected] = React.useState(null);
   const [options, setOptions] = React.useState([]);
   const [loading, setLoading] = React.useState(false);
   const [open, setOpen] = React.useState(false);

   React.useEffect(() => {
      setLoading(true);
      Fetch.get('/users/vehicles/')
         .then((res) => {
            if (res.body.vehicles.length) {
               setOptions(res.body.vehicles || []);
               setSelected(res.body.vehicles[0]);
            }
         })
         .catch((err) => {
            err;
         })
         .finally(() => setLoading(false));
   }, []);

   React.useEffect(() => {
      onChange(selected);
   }, [selected]);

   return (
      <View style={tailwind('flex flex-row justify-between items-center mt-6')}>
         <Text style={[tailwind('text-base'), typefaces.pr, { color: info_text }]}>Placa del vehículo: </Text>
         <Ripple
            style={tailwind(
               'flex flex-row items-center bg-white justify-between w-1/2 px-4 py-2 border border-black rounded-3xl',
            )}
            onPress={() => setOpen(!open)}
         >
            {loading ? (
               <ActivityIndicator size="small" animating color="black" style={tailwind('mb-1')} />
            ) : (
               <Text style={[tailwind('text-sm'), typefaces.pr]}>
                  {selected ? selected.number : 'seleccionar'}
               </Text>
            )}
            <AnimatedArrowIcon change={open} />
         </Ripple>
         {open && !loading && (
            <View style={styles.list}>
               {options.map((item) => (
                  <Ripple
                     key={item.id}
                     style={tailwind('px-4 py-3')}
                     onPress={() => {
                        setSelected(item);
                        setOpen(false);
                     }}
                  >
                     <Text>
                        {item.number} {item.alias}
                     </Text>
                  </Ripple>
               ))}
            </View>
         )}
      </View>
   );
}

const styles = {
   list: [
      tailwind('absolute bg-white w-40 border rounded-sm border-white'),
      { top: 41, left: 120, zIndex: 10 },
      shadowStyle,
   ],
};
