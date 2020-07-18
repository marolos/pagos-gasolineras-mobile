import React from 'react';
import Touchable from 'react-native-platform-touchable';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { colors } from '../../common/constants';

export default function CustomButton({ text, onPress, icon, loading, style }) {
  return (
    <Touchable
      style={style || styles.default}
      background={Touchable.Ripple('white')}
      onPress={onPress || (() => {})}
    >
      <View>
        <ActivityIndicator animating={loading} size="small" color="#ffffff" />
        <>
          {icon && <View>{icon}</View>}
          <Text style={props.textStyle || styles.text}>{text}</Text>
        </>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  default: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    margin: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
