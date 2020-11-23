import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import Fetch from '../utils/Fetch';
import { shadowStyle, typefaces } from '../utils/styles';
import AnimatedArrowIcon from '../icons/AnimatedArrowIcon';

export default function GasStationSelector({ onChange, id }) {
   const [selected, setSelected] = React.useState(null);
   const [options, setOptions] = React.useState([]);
   const [loading, setLoading] = React.useState(false);
   const [open, setOpen] = React.useState(false);
   if(id != null){
      React.useEffect(() => {
            setLoading(true);
            Fetch.get('/company/stations/'+id+"/")
               .then((res) => {
                  console.log(res.body);
                  setOptions(res.body || []);
                  setLoading(false)
               })
               .catch((err) => {
                  err;
               })
               .finally(() => setLoading(false));
      }, []);
   }else{
      setOptions([]);
   }

   React.useEffect(() => {
      onChange(selected);
   }, [selected]);


   return (
      <View style={tailwind('flex flex-row justify-between mt-3 items-center')}>
         <Text style={[tailwind('text-sm'), typefaces.pm]}>Estación: </Text>
         <Ripple
            style={tailwind(
               'flex flex-row items-center justify-between w-40 px-4 py-1 border border-gray-400 rounded',
            )}
            onPress={() => setOpen(!open)}
         >
            {loading ? (
               <ActivityIndicator size="small" animating color="black" style={tailwind('mb-1')} />
            ) : (
               <Text style={[tailwind('text-sm'), typefaces.pr]}>
                  {selected ? selected.name : 'seleccionar'}
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
                        {item.name}
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
