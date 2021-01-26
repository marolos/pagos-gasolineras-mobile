import React, { memo } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH } from '../utils/constants';
import { formatISODate } from '../utils/dateUtils';
import { typefaces } from '../utils/styles';
import { generateQR } from './utils';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import exitIcon from '../../assets/img/salir.png';
import { btn_text, dollar_text } from '../utils/colors';

export default function GenerateCodeView({ route }) {
   const { params } = route;
   const [loading, setLoading] = React.useState(true);
	const [qr, setQr] = React.useState('');
	const navigation = useNavigation();

   React.useEffect(() => {
      generateQR(params.qrcode_string)
         .then((urlImg) => setQr(urlImg))
         .catch((err) => console.error(err))
         .finally(() => {
            setTimeout(() => setLoading(false), 300);
         });
   }, []);

   return (
		<View>
			<View >
				<BackTitle navigation={navigation}/>
			</View>
			<View style={tailwind('flex items-center')}>
				<View style={tailwind('mt-6')}>
					<View style={tailwind('flex flex-row')}>
						<Text style={[tailwind('text-base'), typefaces.pr]}>Cantidad: </Text>
						<Text style={[tailwind('text-base'), typefaces.pr, { color: dollar_text }]}>
							${params.amount}
						</Text>
					</View>
					<View style={tailwind('flex flex-row')}>
						<Text style={[tailwind('text-base'), typefaces.pr]}>Expiración: </Text>
						<Text style={[tailwind('text-base text-black'), typefaces.pr]}>
							{formatISODate(params.code_expiry_date)}
						</Text>
					</View>
				</View>
				<View style={tailwind('flex flex-row justify-center')}>
					{loading ? (
						<ActivityIndicator size="large" color="black" animating />
					) : (
						<Image
							source={{ uri: qr }}
							style={{ width: FULL_WIDTH - 50, height: FULL_WIDTH - 50 }}
						/>
					)}
				</View>
				<View style={tailwind('flex items-center mt-4')}>
					<Text style={[tailwind('text-base text-black'), typefaces.pr]}>
						Código numérico de la recarga:
					</Text>
					<Text style={[tailwind('text-xl'), typefaces.psb, { color: btn_text }]}>
						{params.number_code}
					</Text>
				</View>
			</View>
		</View>
   );
}

const BackTitle = memo(({ navigation }) => {
	return (
		<View style={{ zIndex: 1 }}>
			<Ripple
				onPress={() => navigation.reset({ index: 0, routes: [{ name: 'home' }] })}
				style={[tailwind('absolute rounded-full p-4 pl-2 w-12 items-center'), { right: 0 }]}
				rippleCentered={true}
			>
				<Image source={exitIcon} style={{ width: 12, height: 12 }}/>
			</Ripple>
			<View style={tailwind('flex flex-row items-center ml-12 mb-4 mt-10')}>
				<Text style={[tailwind('text-2xl'), typefaces.pb]}>Código QR</Text>
			</View>
		</View>
	)
})
