import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import { connect } from 'react-redux';
import { typefaces } from '../../utils/styles';

export function CustomHeaderLeft(props) {
  return (
    <View style={[tailwind('flex flex-row items-center')]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.openDrawer()}>
        <View style={tailwind('w-8 h-8 bg-blue-500 rounded-full m-3 ml-4')}></View>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => ({
  activeTab: state.activeTab,
});
export const CustomHeaderTitle = connect(mapStateToProps)((props) => {
  return (
    <Text style={[tailwind('text-base mt-2'), typefaces.pm]}>{props.activeTab}</Text>
  );
});
