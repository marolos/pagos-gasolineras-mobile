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
import Button from '../shared/AppButton';
import LoadingModal from '../shared/LoadingModal';
import SimpleToast from 'react-native-simple-toast';
import { formatISODate } from '../utils/dateUtils';
import { btn_text, dollar_text, info_text} from '../utils/colors'
import qrIcon from '../../assets/img/qr.png';

class PurchaseView extends React.Component {
	constructor(props) {
		super(props);
		let in_process = new Date(this.props.purchase.code_expiry_date) > new Date() && !this.props.purchase.is_done;
		this.state = {
			loading: true,
			purchase: this.props.purchase,
			fuel_type: null,
			is_done: this.props.purchase.is_done,
			in_process: in_process,
			expired: !in_process && !this.props.purchase.is_done,
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
			<ScrollView style={tailwind('')}>
				{this.state.loading ? (
					<View style={[tailwind('flex flex-row justify-center'), { height: 200 }]}>
						<ActivityIndicator animating color="black" size="large" />
					</View>
				) : (
					<View>
						<View style={tailwind('flex justify-center items-center mb-4')}>
							<FastImage
								source={{ uri: this.state.purchase.gas_station.company.company_logo_path }}
								style={{ width: 80, height: 80 }}
							/>
							<Text style={[tailwind('text-lg'), typefaces.psb, { color: dollar_text }]}>
								${parseFloat(this.state.purchase.amount).toFixed(2)}
							</Text>
						</View>
						<View style={tailwind('mb-2')}>
							<Text style={tailwind('text-center text-lg')}>{this.fullName()}</Text>
						</View>
						<View style={tailwind('flex flex-row p-3')}>
							<View>
								<Text style={[{ color: info_text }, tailwind('text-base mb-1')]}>Fecha:</Text>
								<Text style={[{ color: info_text }, tailwind('text-base mb-1')]}>Expira:</Text>
								<Text style={[{ color: info_text }, tailwind('text-base mb-1')]}>Vehículo:</Text>
								<Text style={[{ color: info_text }, tailwind('text-base mb-1')]}>Estación:</Text>
								<Text style={[{ color: info_text }, tailwind('text-base mb-1')]}>Dirección:  </Text>
								{this.state.is_done ? (
									<Text style={[{ color: info_text }, tailwind('text-base mb-1')]}>Gasolina:</Text>) : <View/>}
								{this.state.is_done ? (
									<Text style={[{ color: info_text }, tailwind('text-base mb-1')]}>Galones:</Text>) : <View/>}
							</View>
							<View>
								<Text style={tailwind('text-base mb-1')}>{formatISODate(this.state.purchase.created_at, 'dd/MM/yyyy HH:mm')}</Text>
								<Text style={tailwind('text-base mb-1')}>
									{formatISODate(this.state.purchase.code_expiry_date, 'dd/MM/yyyy HH:mm')}
								</Text>
								<Text style={tailwind('text-base mb-1')}>{this.state.purchase.vehicle.number}
								{this.state.purchase.vehicle.alias
									? '(' + this.state.purchase.vehicle.alias + ')'
									: ''}</Text>
									<Text style={tailwind('text-base mb-1')}>{this.gasStation().name}</Text>
									<Text style={tailwind('text-base mb-1')}>{this.gasStation().address}</Text>
									{this.state.is_done ? (
										<Text style={tailwind('text-base mb-1')}>{this.state.fuel_type.name}</Text>
									) : <View/>}
									{this.state.is_done ? (
										<Text style={tailwind('text-base mb-1')}>{parseFloat(this.state.purchase.gallons).toFixed(2)}</Text>
									) : <View/>}
							</View>
						</View>
						{this.state.generating ? (
							<View style={[tailwind('flex flex-row justify-center')]}>
									<ActivityIndicator animating color="black" size="large" />
							</View>
						) : <View/> }
						{this.state.qr != null ? (
						<View style={tailwind('flex justify-center items-center')}>
								<View>
									<Image
										source={{ uri: this.state.qr }}
										style={{ width: FULL_WIDTH - 190, height: FULL_WIDTH - 190 }}
									/>
									<Text
										style={[tailwind('text-xl text-center'), { color: btn_text }, typefaces.psb]}
									>
										{this.state.purchase.number_code}
									</Text>
								</View>
						</View> ) : <View/>} 
						{this.state.qr == null && this.state.in_process ? (
								<View style={tailwind('flex flex-row justify-end')}>
									<View style={tailwind('flex justify-center items-center mt-5')}>
										<Button primary={false}
											text={"Cancelar recarga"}
											onPress={() => this.setState({ showDelete: true })}
										/>
								</View>
								<View style={tailwind('pl-1')}></View>
								
								<Ripple style={tailwind('w-16 items-center mt-5 justify-center')} onPress={() => this.onGenerate()}>
									<Image source={qrIcon} style={{ width: 30, height: 30 }}/>
								</Ripple>		
							</View>
						) : this.state.in_process ? (
							<View style={tailwind('flex justify-center items-center mt-5')}>
										<Button primary={false}
											text={"Cancelar recarga"}
											onPress={() => this.setState({ showDelete: true })}
										/>
								</View>
						) : <View />
					}
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


const DeletePurchaseModal = memo(({ show, onCancel, onConfirm }) => {
	return (
		<Modal
			isVisible={show}
			animationIn="fadeIn"
			animationOut="fadeOut"
			backdropTransitionOutTiming={0}
			style={tailwind('flex items-center')}
		>
			<View style={tailwind('w-full bg-white rounded-3xl')}>
				<View style={tailwind('p-6 rounded-md')}>
					<View style={tailwind('flex flex-row')}>
						<Text style={[tailwind('text-sm ml-4'), typefaces.psb]}>
							¿Está seguro que desea cancelar la recarga?
						</Text>
					</View>
					<View style={tailwind('flex flex-row justify-evenly mt-4')}>
						<Button
							text={'Cancelar'}
							primary={false}
							onPress={onCancel}
							style={{ width: 100 }}
						/>
						<Button text={'Aceptar'} onPress={onConfirm} style={{ width: 100 }} />
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
			<View style={tailwind('w-full bg-white rounded-3xl')}>
				<View style={tailwind('p-6 rounded-md')}>
					<View style={tailwind('flex flex-row')}>
						<Text style={[tailwind('text-sm ml-4'), typefaces.psb]}>
							Se canceló la recarga con éxito
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
