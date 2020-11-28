import React, { memo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';

export const PolicyDetail = memo(({ data }) => (
	<ScrollView style={[{ height: 250, marginHorizontal: 16 }]}>
		<Text>{data.polices}</Text>
	</ScrollView>
));

export const PurchaseDetail = memo(({ data, body }) => (
	<View>
		<Text>{body}</Text>
		<View style={tailwind('mt-4')}>
			<Text style={[typefaces.pm]}>
				Amount: <Text style={[tailwind('text-green-600')]}>${data.amount}</Text>
			</Text>
			<Text style={[typefaces.pm]}>
				Gasolinera: <Text>{data.gas_station}</Text>
			</Text>
			<Text style={[typefaces.pm]}>
				Combustible: <Text>{data.fueltype}</Text>
			</Text>
		</View>
	</View>
));

export const TipDetail = memo(({ data }) => (
	<View style={tailwind('items-center')}>
		<FastImage
			source={{ uri: data.img_path }}
			style={{ width: 280, height: 200 }}
			resizeMode={FastImage.resizeMode.stretch}
		/>
	</View>
));

export const AdsDetail = memo(({ data }) => (
	<View style={tailwind('items-center')}>
		<FastImage
			source={{ uri: data.img_path }}
			style={{ width: 280, height: 200 }}
			resizeMode={FastImage.resizeMode.stretch}
		/>
	</View>
));

export const DisableUserDetail = memo(({ data }) => <View />);

export const TransferDetail = memo(({ data, body }) => (
	<View>
		<Text>{body}</Text>
		<View>
			<Text>
				Transferido por: <Text>{data.sender}</Text>
			</Text>
			<Text>
				Cantidad: <Text>${data.amount}</Text>
			</Text>
			<Text>
				Gasolinera: <Text>{data.gas_station}</Text>
			</Text>
			<Text>
				Compañia: <Text>{data.company}</Text>
			</Text>
		</View>
	</View>
));
