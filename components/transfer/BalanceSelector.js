import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import Fetch from '../utils/Fetch';
import { shadowStyle, typefaces } from '../utils/styles';
import { makeCancelable } from '../utils/utils';
import AnimatedArrowIcon from '../icons/AnimatedArrowIcon';

export default function BalanceSelector({ onChange }) {
   const [open, setOpen] = React.useState(false);
   const [options, setOptions] = React.useState([]);
   const [selected, setSelected] = React.useState(null);
   const [loading, setLoading] = React.useState(false);

   React.useEffect(() => {
      setLoading(true);
      const req = makeCancelable(
         Fetch.get('/users/balances/'),
         (res) => {
            setOptions(res.body.balances);
            setLoading(false);
         },
         (err) => {
            if (!err.isCanceled) setLoading(false);
         },
      );
      return () => req.cancel();
   }, []);

   React.useEffect(() => {
      if (onChange) onChange(selected);
   }, [selected]);

   const onSelect = React.useCallback((item) => {
      setSelected(item);
      setOpen(false);
   }, []);

   return (
      <View>
         <Ripple style={styles.ripple} onPress={() => setOpen(!open)}>
            {loading ? (
               <ActivityIndicator size="small" animating color="black" style={tailwind('mb-1')} />
            ) : (
               <View style={tailwind('flex flex-row')}>
                  {selected && (
                     <FastImage
                        source={{ uri: selected.company.company_logo_path }}
                        style={{ width: 20, height: 20 }}
                     />
                  )}
                  <Text style={[tailwind('text-sm ml-1 mr-2'), typefaces.pr]}>
                     {selected ? selected.gas_station.name : 'seleccionar'}
                  </Text>
               </View>
            )}
            <AnimatedArrowIcon change={open} />
         </Ripple>
         {open && !loading && (
            <View style={styles.list}>
               {options.map((item) => (
                  <Ripple
                     key={item.id}
                     style={tailwind('px-3 py-3')}
                     onPress={() => onSelect(item)}
                  >
                     <Item item={item} />
                  </Ripple>
               ))}
            </View>
         )}
      </View>
   );
}

function Item({ item }) {
   return (
      <View style={tailwind('flex flex-row justify-between')}>
         <View style={tailwind('flex flex-row')}>
            <FastImage
               source={{ uri: item.company.company_logo_path }}
               style={{ width: 20, height: 20 }}
            />
            <Text style={tailwind('ml-2')}>{item.gas_station.name}</Text>
         </View>
         <Text style={item.total ? tailwind('text-green-600') : tailwind('text-gray-600')}>
            ${item.total}
         </Text>
      </View>
   );
}

const styles = {
   ripple: [
      tailwind(
         'flex flex-row items-center justify-between px-4 py-2 border border-gray-400 rounded',
      ),
      { minWidth: 130 },
   ],
   list: [
      tailwind('absolute bg-white w-64 border rounded-sm border-white'),
      { top: 41, right: 0, zIndex: 10 },
      shadowStyle,
   ],
};
