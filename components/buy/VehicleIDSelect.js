import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Ripple from 'react-native-material-ripple';
import Animated, { Easing } from 'react-native-reanimated';
import tailwind from 'tailwind-rn';
import Fetch from '../../utils/Fetch';
import { shadowStyle, typefaces } from '../../utils/styles';
import ChevronDown from '../icons/ChevronDown';


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
         .catch((err) => {})
         .finally(() => setLoading(false));
   }, []);

   React.useEffect(() => {
      onChange(selected);
   }, [selected]);

   return (
      <View style={tailwind('flex flex-row justify-between mt-6')}>
         <Text style={[tailwind('text-base'), typefaces.pm]}>Placa: </Text>
         <Ripple
            style={tailwind(
               'flex flex-row items-center justify-between w-1/2 px-4 py-2 border border-gray-400 rounded',
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
            <AnimatedIcon change={open} />
         </Ripple>
         {open && (
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

function AnimatedIcon({ change }) {
   const [value, setValue] = React.useState(new Animated.Value(0));

   React.useEffect(() => {
      Animated.timing(value, {
         toValue: change ? 1 : 0,
         duration: 120,
         easing: Easing.cubic,
      }).start();
   }, [change]);

   const spin = value.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg'],
   });

   return (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
         <ChevronDown />
      </Animated.View>
   );
}


const styles = {
   list: [
      tailwind('absolute bg-white w-40 border rounded-sm border-white'),
      { top: 41, left: 120, zIndex: 10 },
      shadowStyle,
   ],
};

