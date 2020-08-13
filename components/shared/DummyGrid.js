import React from 'react'
import { createChunks } from '../../utils/utils';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';

export const DummyGrid = ({ ncol, GridItemComponent, data, onItemPress }) => {
  const chunks = createChunks(Array.from(data.keys()), ncol);
  return (
    <View>
      {chunks.map((rowArray) => (
        <View key={rowArray} style={tailwind('flex flex-row')}>
          {rowArray.map((itemArray) => (
            <GridItemComponent
              key={itemArray}
              {...data[itemArray]}
              index={itemArray}
              onPress={() => onItemPress(data[itemArray])}
            />
          ))}
        </View>
      ))}
    </View>
  );
};