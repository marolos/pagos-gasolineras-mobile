import React, { memo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import SimpleToast from 'react-native-simple-toast';
import tailwind from 'tailwind-rn';
import StarIcon from '../icons/StarIcon';
import BasicInput from '../shared/BasicInput';
import Button from '../shared/Button';
import LoadingButton from '../shared/LoadingButton';
import Fetch from '../utils/Fetch';
import { useObjState } from '../utils/hooks';
import { typefaces } from '../utils/styles';

export const PolicyDetail = memo(({ data }) => (
	<ScrollView style={[{ height: 250, marginHorizontal: 16 }]}>
		<Text>{data.polices}</Text>
	</ScrollView>
));

export const PurchaseDetail = memo(({ data, body, onClose }) => (
	<View>
		<Text>{body}</Text>
		<View style={tailwind('mt-4')}>
			<Text style={[typefaces.pm]}>
				Amount: <Text style={[tailwind('text-green-600')]}>${data.amount}</Text>
			</Text>
			<Text style={[typefaces.pm]}>
				Combustible: <Text>{data.fueltype}</Text>
			</Text>
			<View style={tailwind('my-3')}>
				<Text style={tailwind('text-center')}>Calificar Servicio:</Text>
				<PurchaseRating onClose={onClose} purchaseId={data.purchase_id} />
			</View>
		</View>
	</View>
));

class PurchaseRating extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 0,
		};
		this.comment = '';
	}

	sendRating = () => {
		const { purchaseId } = this.props;
		Fetch.post(`/purchase/rate/${purchaseId}/`, {
			rating: this.state.rating,
			comment: this.comment,
		})
			.then(() => {})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				this.props.onClose();
				SimpleToast.showWithGravity('Calificacion enviada.', 800, SimpleToast.CENTER);
			});
	};

	render() {
		const values = new Array(5).fill(0).fill(1, 0, this.state.rating);
		return (
			<View>
				<View style={tailwind('flex flex-row justify-center mb-2')}>
					{values.map((value, i) => (
						<Ripple
							key={i}
							onPress={() => this.setState({ rating: i + 1 })}
							style={tailwind('p-1')}
							rippleDuration={300}
							rippleOpacity={0.4}
							rippleColor="#fcd34d"
							rippleSize={100}
							rippleCentered
						>
							<StarIcon
								fill={value === 1 ? '#fbbf24' : '#bbb'}
								stroke={value === 1 ? '#fbbf24' : '#bbb'}
								width={26}
								height={26}
							/>
						</Ripple>
					))}
				</View>
				<View>
					<BasicInput
						placeholder="Comentario (opcional)"
						onChange={(text) => (this.comment = text)}
						maxLength={300}
						style={typefaces.pr}
						multiline={true}
					/>
				</View>
				<View style={tailwind('flex flex-row items-center mt-4')}>
					<Button text="cerrar" onPress={this.props.onClose} primary={false} />
					<LoadingButton
						text="hecho"
						style={tailwind('w-32 ml-2')}
						viewStyle={{ paddingBottom: 10, paddingTop: 10 }}
						onPress={this.sendRating}
					/>
				</View>
			</View>
		);
	}
}

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
