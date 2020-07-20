import React from 'react';
import Touchable from 'react-native-platform-touchable';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

export default function CustomButton({ text, onPress, icon, loading, style, textStyle }) {
  return (
    <Touchable
      background={Touchable.Ripple('white')}
			onPress={onPress || (() => {})}
			style={style || styles.default}
    >
      <View>
        <ActivityIndicator animating={loading} size="small" color="#ffffff" />
        <>
          {icon && <View>{icon}</View>}
          <Text style={textStyle || styles.text}>{text}</Text>
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
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 5,
  },
  text: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
