import React from 'react'
import { View, Text, Button } from "react-native";
import LoadingButton from '../shared/LoadingButton';
import NextIcon from '../icons/NextIcon';
import tailwind from 'tailwind-rn';

export default function TopupDataView(props) {
  return (
    <View>
      <Text>Topup</Text>
      <View style={tailwind('flex flex-row justify-end pr-6 mt-12 mb-4')}>
        <LoadingButton
          icon={<NextIcon />}
          iconPos={'right'}
          text="continuar"
          style={tailwind('w-48')}
        />
      </View>
    </View>
  );
}
