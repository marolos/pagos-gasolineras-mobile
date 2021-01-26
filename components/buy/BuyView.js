import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import tailwind from 'tailwind-rn';
import { FULL_HIGHT, FULL_WIDTH } from '../utils/constants';
import { typefaces } from '../utils/styles';
import AddSubInput from '../shared/AddSubInput';
import Button from '../shared/AppButton';
import LoadingModal from '../shared/LoadingModal';
import VehicleIDSelect from './VehicleIDSelect';
import Modal from 'react-native-modal';
import SimpleToast from 'react-native-simple-toast';
import QRIcon from '../icons/QRIcon';
import Ripple from 'react-native-material-ripple';
import Fetch from '../utils/Fetch';
import BackIcon from '../icons/SmallBackIcon';
import InfoIcon from '../../assets/img/popup.png'
import { background,
	dollar_text,
	btn_text,
	info_text } from '../utils/colors';

export default class BuyView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: 0.0,
			vehicle: null,
			balance: this.props.route.params,
			showConfirm: false,
			showBuying: false,
			showBuyDone: false,
			createdPurchase: null,
		};
	}

	updateAmount = (value) => {
		this.setState(() => ({ amount: value }));
	};

	onSelectVehicle = (value) => {
		this.setState(() => ({ vehicle: value }));
	};

	tryBuy = () => {
		const { amount, balance, vehicle } = this.state;
		if (!vehicle) {
			SimpleToast.show('Seleccionar una placa');
			return;
		}
		if (amount < 1) {
			SimpleToast.show('Ingrese una cantidad válida');
			return;
		}
		const remaining = balance.total - amount;
		if (remaining < 0) {
			SimpleToast.show('Saldo insuficiente');
			return;
		}
		this.setState({ showConfirm: true });
	};

	onConfirm = () => {
		this.setState({ showBuying: true, showConfirm: false });
		const { id, gas_station, company } = this.state.balance;

		const data = {
			gas_station,
			company,
			balance_id: id,
			amount: this.state.amount,
			vehicle: this.state.vehicle,
		};

		Fetch.post('/purchase/create/', data)
			.then((res) => {
				this.setState({
					showBuying: false,
					showBuyDone: true,
					createdPurchase: res.body.purchase,
				});
				setTimeout(()=> this.makePurchaseDone(res.body.purchase), 5000)
			})
			.catch((err) => {
				console.error(err);
				this.setState({ showBuying: false, showBuyDone: false, showConfirm: false });
				SimpleToast.showWithGravity(
					'No se pudo completar la transacción, reintente',
					1000,
					SimpleToast.CENTER,
				);
			});
	};

	/**
	 * TODO: delete
	 * it's to simulate that the QR was already read
	 * and the fuel was dispatched in the station
	 */
	makePurchaseDone = async  (purchase) => {
		Fetch.put(`/purchase/${purchase.id}/done/`, { fueltypeId: 1 })
			.then((res) => console.log(res.body))
			.catch((err) => {
				console.error(err);
			});
	};

	onCancel = () => {
		this.setState({ showConfirm: false, showBuyDone: false, showBuying: false });
	};

	close = () => {
		this.props.navigation.reset({ index: 0, routes: [{ name: 'home' }] });
	};

	goCodeView = () => {
		this.setState({ showBuying: false, showBuyDone: false, showConfirm: false }, () =>
			this.props.navigation.navigate('generateCode', this.state.createdPurchase),
		);
	};

	render() {
		const { gas_station, company, total } = this.state.balance;
		const remaining = total - this.state.amount;
		return (
			<View style={{ height: FULL_HIGHT, width: FULL_WIDTH }}>
				<View style={{zIndex: 1 }}>
					<BackTitle navigation={this.props.navigation} station={this.state.balance}/>
				</View>
				<View style={[tailwind('flex rounded-2xl p-6 h-full'), { backgroundColor: background, zIndex: 0 }]}>
					<Text style={[{ color: btn_text }, typefaces.psb, tailwind('text-lg mb-2')]}>
						Recargar combustible</Text>
					<View style={tailwind('flex flex-row justify-end mb-8')}>
						<Text style={[tailwind('text-base'), typefaces.pr, { color: info_text }]}>Saldo actual: </Text>
						<Text
							style={[
								tailwind('text-base ml-2'),
								typefaces.pr,
								remaining <= 0.0 ? tailwind('text-red-600') : { color: dollar_text },
							]}
						>
							${remaining}
						</Text>
					</View>
					<View style={tailwind('flex flex-row justify-between mt-2')}>
						<Text style={[tailwind('text-base'), typefaces.pr, { color: info_text }]}>Gasolinera: </Text>
						<Text numberOfLines={1} style={[tailwind('text-base ml-2'), typefaces.pr]}>{gas_station.name}</Text>
					</View>
					<VehicleIDSelect onChange={this.onSelectVehicle} />
					<View style={tailwind('mt-6')} />
					<Text style={[tailwind('text-base mb-3'), typefaces.pr, { color: info_text }]}>Cantidad en $: </Text>
					<AddSubInput onChange={this.updateAmount} />
					<ConfirmBuyModal
						show={this.state.showConfirm}
						onConfirm={this.onConfirm}
						onCancel={this.onCancel}
						gasStation={gas_station}
						amount={this.state.amount}
						vehicle={this.state.vehicle}
					/>
					<LoadingModal show={this.state.showBuying} text="Realizando la recarga." />
					<BuyDoneModal
						show={this.state.showBuyDone}
						onCancel={this.close}
						onConfirm={this.goCodeView}
					/>
				</View>
				<View style={[tailwind('absolute'), { bottom: 100, right: FULL_WIDTH / 4 }]}>
					<Button
						text="Recargar"
						onPress={this.tryBuy}
						style={tailwind('w-40')}
						viewStyle={tailwind('py-3')}
						primary
					/>
				</View>
			</View>
		);
	}
}


const BackTitle = memo(({ navigation, station }) => {
	return (
		<View style={{ zIndex: 1 }}>
			<Ripple
				onPress={navigation.goBack}
				style={tailwind('rounded-full p-2 pl-2 w-12 items-center')}
				rippleCentered={true}
			>
				<BackIcon />
			</Ripple>
			<View style={tailwind('flex flex-row items-center ml-12 mb-4')}>
			<FastImage
					source={{ uri: station.company.company_logo_path }}
					style={tailwind('w-12 h-12')}
				/>
				<Text style={[tailwind('text-2xl'), typefaces.pb]}>{station.gas_station.name}</Text>
			</View>
		</View>
	)
})

const ConfirmBuyModal = memo(({ show, onConfirm, onCancel, gasStation, amount, vehicle }) => {
	return (
		<Modal
			isVisible={show}
			animationIn="fadeIn"
			animationOut="fadeOut"
			backdropTransitionOutTiming={0}
			onSwipeComplete={onCancel}
			onBackdropPress={onCancel}
			swipeDirection={['down']}
			style={tailwind('flex items-center')}
		>
			<View style={tailwind('w-full bg-white rounded-lg')}>
				<View style={tailwind('py-10 rounded-md px-10')}>
					<View style={tailwind('flex flex-row')}>
						<Text style={[tailwind('text-xl'), typefaces.psb]}>Confirmar recarga</Text>
					</View>
					<View style={tailwind('py-6')}>
						<View style={tailwind('flex flex-row items-center')}>
							<View>
								<Text style={[tailwind('text-sm'), typefaces.pr, { color: info_text }]}>Gasolinera: </Text>
								{vehicle && (
									<Text style={[tailwind('text-sm'), typefaces.pr, { color: info_text }]}>Placa del vehículo: </Text>
								)}
								<Text style={[tailwind('text-sm'), typefaces.pr, { color: info_text }]}>Cantidad en $: </Text>
							</View>
							<View>
								<Text numberOfLines={1} style={[tailwind('text-sm ml-2 w-40'), typefaces.pr]}>{gasStation.name}</Text>
								{vehicle && (
								<Text style={[tailwind('text-sm ml-2'), typefaces.pr]}>
									{vehicle.number} {vehicle.alias}
								</Text>)}
								<Text style={[tailwind('text-sm ml-2'), typefaces.pr]}>
								${amount}
							</Text>
							</View>
						</View>
					</View>
					<View style={tailwind('flex flex-row justify-evenly mt-8')}>
						<Button text={'confirmar'} onPress={onConfirm} />
					</View>
				</View>
			</View>
		</Modal>
	);
});

const BuyDoneModal = memo(({ show, onCancel, onConfirm }) => {
	return (
		<Modal
			isVisible={show}
			animationIn="fadeIn"
			animationOut="fadeOut"
			backdropTransitionOutTiming={0}
			style={tailwind('flex items-center')}
		>
			<View style={tailwind('w-full bg-white rounded-lg')}>
				<View style={tailwind('p-6 rounded-md')}>
					<View style={tailwind('flex flex-row')}>
						<Text style={[tailwind('text-xl'), typefaces.psb]}>Recarga guardada</Text>
					</View>
					<View style={tailwind('flex flex-row justify-center my-4')} >
						<Image source={InfoIcon} style={{ width: 70, height: 70 }}/>
					</View>
					<View>
						<View style={tailwind('p-2')}>
							<Text style={[typefaces.pr, tailwind('text-center'), { color: info_text }]}>
								Puede generar el código de la recarga ahora, o generarlo luego buscándolo en
								el menu historial
							</Text>
						</View>
					</View>
					<View style={tailwind('flex flex-row justify-evenly mt-4')}>
						<Button
							text={'Cerrar'}
							primary={false}
							onPress={onCancel}
							style={tailwind('w-32')}
						/>
						<Button
							text={'Generar QR'}
							onPress={onConfirm}
							style={[{ width: 100 }, tailwind('w-32')]}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
});

const QRButton = memo(({ onPress, text }) => {
	return (
		<Ripple
			onPress={onPress}
			style={tailwind('rounded-md items-center w-40')}
			rippleColor="#ffffff"
			rippleSize={500}
			rippleDuration={600}
		>
			<View
				style={tailwind(
					'flex flex-row bg-black rounded-md items-center justify-evenly w-full py-2 px-4',
				)}
			>
				<QRIcon />
				<Text style={[tailwind('text-white mt-1'), typefaces.pm]}>{text}</Text>
			</View>
		</Ripple>
	);
});
