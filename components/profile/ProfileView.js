import React from 'react';
import { View, Text, Button } from 'react-native';


export default function ProfileView(props) {
  return (
    <View>
      <Text>profile</Text>
		<Button onPress={()=> props.navigation.navigate('profileView2')} title='xxx'>go</Button>
    </View>
  );
}
