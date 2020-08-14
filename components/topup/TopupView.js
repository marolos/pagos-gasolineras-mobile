import React from 'react'
import { View, Text, Button } from "react-native";

export default function TopupView(props) {
  return (
    <View>
      <Text>Topup</Text>
      <Button title={'back'} onPress={() => props.navigation.goBack()}/>
    </View>
  );
}
