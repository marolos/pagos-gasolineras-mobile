import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import { connect } from 'react-redux';
import { typefaces } from '../../utils/styles';
import HamburguerIcon from '../icons/HamburguerIcon';
import Ripple from 'react-native-material-ripple';

export function CustomHeaderLeft(props) {
   return (
      <Ripple
         style={[tailwind('flex flex-row items-center ml-2')]}
			onPress={() => props.navigation.openDrawer()}
			rippleCentered
      >
         <View style={{padding: 10, justifyContent: 'center'}}>
            <HamburguerIcon />
         </View>
      </Ripple>
   );
}

const mapStateToProps = (state) => ({
   activeTab: state.activeTab,
});
export const CustomHeaderTitle = connect(mapStateToProps)((props) => {
   return <Text style={[tailwind('text-base mt-2'), typefaces.pm]}>{props.activeTab.label}</Text>;
});
