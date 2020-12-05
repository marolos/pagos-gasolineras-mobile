import React, { memo } from 'react';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { View, Text, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';
import Ripple from 'react-native-material-ripple';

function FacebookButton({ onFacebookLogin }) {
	function doSignUp() {
		setTimeout(
			() =>
				onFacebookButtonPress()
					.then(onFacebookLogin)
					.catch((e) => console.error(e.message)),
			80,
		);
	}

	return (
		<Ripple style={tailwind('rounded-md items-center w-40 mt-6')} onPress={doSignUp}>
			<View style={[tailwind('rounded-md items-center w-full py-3'), styles.blue]}>
				<Text style={tailwind('text-white text-xs')}>Iniciar con facebook</Text>
			</View>
		</Ripple>
	);
}

async function onFacebookButtonPress() {
	try {
		const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
		if (result.isCancelled) {
			throw new Error('User cancelled the login process');
		}
		const data = await AccessToken.getCurrentAccessToken();

		if (!data) {
			throw new Error('Something went wrong obtaining access token');
		}
		return data.accessToken;
	} catch (e) {
		throw new Error(e.message);
	}
}

const styles = StyleSheet.create({
	blue: { backgroundColor: '#3B5998' },
});

export default memo(FacebookButton);
