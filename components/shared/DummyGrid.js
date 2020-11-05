import React from 'react';
import { createChunks } from '../utils/utils';
import { View, ActivityIndicator, Image, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import emptyImage from '../../assets/background/empty.png';
import { typefaces } from '../utils/styles';

export const DummyGrid = ({ ncol, GridItemComponent, data, onItemPress, loading }) => {
   const chunks = createChunks(Array.from(data.keys()), ncol);
   return (
      <View>
         {loading ? (
            <View style={[tailwind('flex flex-row justify-center'), { height: 200 }]}>
               <ActivityIndicator animating color="black" size="large" />
            </View>
         ) : data.length < 1 ? (
            <EmptyMessage />
         ) : (
            chunks.map((rowArray) => (
               <View key={rowArray} style={tailwind('flex flex-row')}>
                  {rowArray.map((itemArray) => (
                     <GridItemComponent
                        key={itemArray}
                        company={data[itemArray].company}
                        total={data[itemArray].total}
                        index={itemArray}
                        onPress={() => onItemPress(data[itemArray])}
                     />
                  ))}
               </View>
            ))
         )}
      </View>
   );
};

function EmptyMessage(props) {
   return (
      <View style={tailwind('items-center mt-6')}>
         <View>
            <Image source={emptyImage} style={[tailwind('w-32 h-48')]} />
         </View>
         <View style={tailwind('px-12')}>
            <Text style={[tailwind('text-gray-600 text-lg text-center'), typefaces.pm]}>
               No haz recargado en ninguna gasolinera aún.
            </Text>
            <Text style={[tailwind('text-gray-500 text-sm text-center'), typefaces.pr]}>
               Usa el buscador para encontrar tu gasolinera favorita
            </Text>
         </View>
      </View>
   );
}
