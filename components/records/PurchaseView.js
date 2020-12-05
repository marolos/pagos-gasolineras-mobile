import React, { memo } from 'react';
import { makeCancelable } from '../utils/utils';
import Fetch from '../utils/Fetch';
import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import FastImage from 'react-native-fast-image';
import { typefaces } from '../utils/styles';
import { generateQR } from '../buy/utils';
import { FULL_WIDTH, FULL_HIGHT } from '../utils/constants';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
import QRIcon from '../icons/QRIcon';
import CheckRoundedIcon from '../icons/CheckRoundedIcon';
import Button from '../shared/Button';
import LoadingModal from '../shared/LoadingModal';
import SimpleToast from 'react-native-simple-toast';
import InfoIcon from '../icons/InfoIcon';
import { formatISODate } from '../utils/dateUtils';

class PurchaseView extends React.Component {
	constructor(props) {
		super(props);
		let in_process = new Date(this.props.route.params.code_expiry_date) > new Date();
		this.state = {
			loading: true,
			purchase: this.props.route.params,
			fuel_type: null,
			is_done: this.props.route.params.is_done,
			in_process: in_process,
			expired: !in_process && !this.props.route.params.is_done,
			qr: null,
			generating: false,
			showDelete: false,
			showLoading: false,
			showDone: false,
		};
	}

	componentDidMount() {
		this.cancelControl = makeCancelable(
			Fetch.get('/purchase/user/' + this.state.purchase.id + '/', {
				is_done: this.state.purchase.is_done,
			}),
			(value) => {
				const data = value.body;
				if (this.state.is_done) {
					this.setState({
						purchase: data.purchase,
						fuel_type: data.fuel_type,
						loading: false,
					});
				} else {
					this.setState({ purchase: data, loading: false });
				}
			},
			(err) => {
				if (err.isCanceled) return;
				this.setState({ loading: false });
			},
		);
	}

	componentWillUnmount() {
		if (this.cancelControl) this.cancelControl.cancel();
		if (this.cancelDelete) this.cancelDelete.cancel();
	}

	fullName = () => {
		const user = this.state.purchase.user;
		return user.first_name + ' ' + user.last_name;
	};

	gasStation = () => {
		return this.state.purchase.gas_station;
	};

	onGenerate = () => {
		this.setState({ generating: true });
		generateQR(this.state.purchase.qrcode_string)
			.then((urlImg) => this.setState({ qr: urlImg }))
			.catch((err) => console.error(err))
			.finally(() => {
				setTimeout(() => this.setState({ generating: false }), 300);
			});
	};

	close = () => {
		this.setState({ showDelete: false });
	};

	closePage = () => {
		this.setState({ showDone: false }, () => {
			this.props.navigation.reset({ index: 0, key: null, routes: [{ name: 'home' }] });
		});
	};

	deletePurchase = () => {
		this.setState({ showDelete: false, showLoading: true });
		this.cancelDelete = makeCancelable(
			Fetch.delete('/purchase/delete/' + this.state.purchase.id + '/'),
			(value) => {
				this.setState({ showLoading: false, showDone: true });
			},
			(err) => {
				console.log(err);
				this.setState({ showLoading: false });
				SimpleToast.show('No se pudo cancelar la compra.');
			},
		);
	};

	render() {
		return (
			<ScrollView style={tailwind('mb-4 px-4')}>
				{this.state.loading ? (
					<View style={[tailwind('flex flex-row justify-center'), { height: 200 }]}>
						<ActivityIndicator animating color="black" size="large" />
					</View>
				) : (
					<View style={[tailwind('mt-1'), { height: FULL_HIGHT, width: FULL_WIDTH }]}>
						<Text style={[tailwind('text-xs')]}>
							{this.state.is_done ? (
								<Text style={tailwind('text-red-500')}>(efectuado)</Text>
							) : this.state.in_process ? (
								<Text style={tailwind('text-yellow-500')}>(en proceso)</Text>
							) : (
								<Text style={tailwind('text-gray-700')}>(expirada)</Text>
							)}
						</Text>
						<View style={tailwind('flex justify-center items-center mb-6')}>
							<FastImage
								source={{ uri: this.state.purchase.gas_station.company.company_logo_path }}
								style={{ width: 100, height: 100 }}
							/>
							<Text style={[tailwind('text-green-600'), typefaces.pm]}>
								${parseFloat(this.state.purchase.amount).toFixed(2)}
							</Text>
						</View>
						<View>
							<Text>
								<Text style={typefaces.pb}>Fecha:</Text>{' '}
								{formatISODate(this.state.purchase.created_at, 'dd/MM/yyyy HH:mm')}
							</Text>
							<Text>
								<Text style={typefaces.pb}>Expira:</Text>{' '}
								{formatISODate(this.state.purchase.code_expiry_date, 'dd/MM/yyyy HH:mm')}
							</Text>
							<Text>
								<Text style={typefaces.pb}>Cliente: </Text>
								{this.fullName()}
							</Text>
							<Text>
								<Text style={typefaces.pb}>Vehículo:</Text>{' '}
								{this.state.purchase.vehicle.number}
								{this.state.purchase.vehicle.alias
									? '(' + this.state.purchase.vehicle.alias + ')'
									: ''}
							</Text>
						</View>
						<View style={tailwind('mt-3')}>
							<Text>
								<Text style={typefaces.pb}>Estación: </Text>
								{this.gasStation().name}
							</Text>
							<Text>
								<Text style={typefaces.pb}>Dirección: </Text>
								{this.gasStation().address}
							</Text>
						</View>
						{this.state.is_done ? (
							<View style={tailwind('mt-3')}>
								<Text>
									<Text style={typefaces.pb}>Gasolina: </Text>
									{this.state.fuel_type.name}
								</Text>
								<Text>
									<Text style={typefaces.pb}>Galones:</Text>{' '}
									{parseFloat(this.state.purchase.gallons).toFixed(2)}
								</Text>
							</View>
						) : (
							<View />
						)}
						<View style={tailwind('flex justify-center items-center mt-4 mb-2')}>
							{this.state.qr == null && this.state.in_process ? (
								<QRButton text={'Generar QR'} onPress={() => this.onGenerate()} />
							) : this.state.generating ? (
								<View style={[tailwind('flex flex-row justify-center')]}>
									<ActivityIndicator animating color="black" size="large" />
								</View>
							) : this.state.in_process ? (
								<View>
									<Text
										style={[tailwind('text-xl text-gray-800 text-center'), typefaces.pm]}
									>
										{this.state.purchase.number_code}
									</Text>
									<Image
										source={{ uri: this.state.qr }}
										style={{ width: FULL_WIDTH - 130, height: FULL_WIDTH - 130 }}
									/>
								</View>
							) : (
								<View />
							)}
						</View>
						{this.state.in_process ? (
							<View style={[tailwind('absolute w-full mt-2'), { bottom: 0 }]}>
								<View
									style={{ borderWidth: 1, borderColor: 'red', borderBottomColor: 'red' }}
								/>
								<TouchableOpacity
									style={tailwind('mt-2')}
									onPress={() => this.setState({ showDelete: true })}
								>
									<Text style={tailwind('text-center text-red-500')}>CANCELAR COMPRA</Text>
								</TouchableOpacity>
							</View>
						) : (
							<View />
						)}
					</View>
				)}
				<LoadingModal show={this.state.showLoading} text="Cancelando compra." />
				<PurchaseCancelDoneModal show={this.state.showDone} onClose={this.closePage} />
				<DeletePurchaseModal
					show={this.state.showDelete}
					onCancel={this.close}
					onConfirm={this.deletePurchase}
				/>
			</ScrollView>
		);
	}
}

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

const DeletePurchaseModal = memo(({ show, onCancel, onConfirm }) => {
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
						<CheckRoundedIcon />
						<Text style={[tailwind('text-sm ml-4'), typefaces.psb]}>
							¿Está seguro que desea cancelar la compra?
						</Text>
					</View>
					<View style={tailwind('flex flex-row justify-evenly mt-4')}>
						<Button
							text={'cancelar'}
							primary={false}
							onPress={onCancel}
							style={{ width: 100 }}
						/>
						<Button text={'aceptar'} onPress={onConfirm} style={{ width: 100 }} />
					</View>
				</View>
			</View>
		</Modal>
	);
});

const PurchaseCancelDoneModal = ({ show, onClose }) => {
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
						<InfoIcon />
						<Text style={[tailwind('text-sm ml-4'), typefaces.psb]}>
							Se canceló la compra con éxito
						</Text>
					</View>
					<View style={tailwind('flex flex-row justify-evenly mt-8')}>
						<Button text={'Aceptar'} onPress={onClose} style={{ width: 100 }} />
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default PurchaseView;
