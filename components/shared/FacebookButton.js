import React, { memo } from 'react';
import { LoginManager, AccessToken} from 'react-native-fbsdk';
import { View, Text, StyleSheet, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import Ripple from 'react-native-material-ripple';
import fbIcon from '../../assets/img/facebook.png';
import { fb_btn } from '../utils/colors';
import { typefaces } from '../utils/styles';

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
		<Ripple style={tailwind('rounded-md items-center w-56 mt-10')} onPress={doSignUp}>
			<View style={[tailwind('flex flex-row rounded-md items-center justify-center w-full py-3'), styles.blue]}>
				<Image source={fbIcon} style={{ width: 10, height: 21 }}/>
				<View style={tailwind("w-3")}></View>
				<Text style={tailwind('text-white')}>Acceder con <Text style={typefaces.psb}>Facebook</Text></Text>
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
	blue: { backgroundColor: fb_btn },
});

export default memo(FacebookButton);
