import React from 'react';
import { createChunks } from '../../utils/utils';
import { View, ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';

export const DummyGrid = ({ ncol, GridItemComponent, data, onItemPress, loading }) => {
   const chunks = createChunks(Array.from(data.keys()), ncol);
   return (
      <View>
         {loading && (
            <View style={[tailwind('flex flex-row justify-center'), { height: 200 }]}>
               <ActivityIndicator animating color="black" size="large" />
            </View>
         )}
         {!loading &&
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
            ))}
      </View>
   );
};
