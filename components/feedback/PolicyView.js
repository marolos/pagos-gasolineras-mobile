import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import SmallBackIcon from '../icons/SmallBackIcon';
import { white } from '../utils/colors';
import Fetch from '../utils/Fetch';
import { typefaces } from '../utils/styles';

export default function PolicyView({ navigation }) {
	const [policy, setPolicy] = React.useState(null);
	React.useEffect(() => {
		Fetch.get('/company/policies/app/')
			.then((res) => setPolicy(res.body))
			.catch((err) => {
				err;
			});
	}, []);
	return (
		<React.Fragment>
			<Head navigation={navigation} />
			<ScrollView style={{ padding: 24 }}>
				{policy ? (
					<Text>{policy.description}</Text>
				) : (
					<ActivityIndicator color="black" animating />
				)}
			</ScrollView>
		</React.Fragment>
	);
}

function Head({ navigation }) {
	return (
		<View style={{ zIndex: 1, backgroundColor: white, marginTop: 12 }}>
			<Ripple
				onPress={navigation.goBack}
				style={tailwind('rounded-full p-2 w-12 items-center')}
				rippleCentered={true}
			>
				<SmallBackIcon />
			</Ripple>
			<Text style={[tailwind('text-2xl ml-16 mb-4'), typefaces.pb]}>Políticas de servicio</Text>
		</View>
	);
}
