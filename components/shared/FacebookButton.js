import React from 'react';
//import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';

export default function FacebookButton({ onFacebookLogin }) {
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    //const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    //return auth().signInWithCredential(facebookCredential);
    return data.accessToken
  }

  const styles = StyleSheet.create({
    blue: { backgroundColor: '#3B5998' },
  });

  return (
    <TouchableOpacity
      style={tailwind('rounded-md items-center w-48 mt-6')}
      onPress={() => onFacebookButtonPress().then(onFacebookLogin)}
    >
      <View style={[tailwind('rounded-md items-center w-full py-3'), styles.blue]}>
        <Text style={tailwind('text-white')}>Iniciar con facebook</Text>
      </View>
    </TouchableOpacity>
  );
}
