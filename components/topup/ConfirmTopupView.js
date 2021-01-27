import React, { memo } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import { Resume } from './TopupDataView';
import { typefaces } from '../utils/styles';
import tailwind from 'tailwind-rn';
import InfoIcon from '../icons/InfoIcon';
import Button from '../shared/Button';
import Modal from 'react-native-modal';
import CheckRoundedIcon from '../icons/CheckRoundedIcon';
import { getOrderByAmount } from '../utils/utils';
import SimpleToast from 'react-native-simple-toast';
import Fetch from '../utils/Fetch';
import Ripple from 'react-native-material-ripple';
import SmallBackIcon from '../icons/SmallBackIcon';
import FastImage from 'react-native-fast-image';
import { background, black, btn_text, info_text, white } from '../utils/colors';
import AppButton from '../shared/AppButton';
import InfoIconp from '../../assets/img/popup.png';

class ConfirmTopupView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			sending: false,
			showConfirmCancel: false,
			balanceResult: null,
		};
	}

	accept = () => {
		this.setState({ showModal: true, sending: true });
		const { amount, card, company, gas_station } = this.props.route.params;

		Fetch.post('/payment/card/debit/', {
			card: { token: card.token },
			order: { ...getOrderByAmount(amount), total: amount },
			company,
			gas_station,
		})
			.then((res) => {
				this.setState({ balanceResult: res.body.balance });
				if (!card.save) {
					Fetch.delete('/payment/user/card/', card)
						.then((_res) => console.log(_res))
						.catch((err) => console.error('on delete::::', err))
						.finally(() => this.setState({ sending: false }));
				} else {
					this.setState({ sending: false });
				}
			})
			.catch((err) => {
				this.setState({ sending: false, showModal: false });
				SimpleToast.show('No se pudo completar la transacción');
			});
	};

	cancel = () => {
		this.setState({ showConfirmCancel: false }, () =>
			setTimeout(
				() => this.props.navigation.reset({ index: 0, routes: [{ name: 'tabMenu' }] }),
				100,
			),
		);
	};

	onDoneClose = () => {
		this.setState({ showModal: false }, () => {
			this.props.navigation.reset({ index: 0, routes: [{ name: 'tabMenu' }] });
		});
	};

	onDoneGoBuy = () => {
		const { company, gas_station } = this.props.route.params;
		const { id, total } = this.state.balanceResult;
		this.setState({ showModal: false }, () => {
			this.props.navigation.navigate('buyAfterTopup', { company, gas_station, id, total });
		});
	};

	render() {
		const { amount, company, gas_station } = this.props.route.params;
		const balance_id = this.props.route.params.id;
		return (
			<View style={{ flex: 1, backgroundColor: white }}>
				<BackTitle navigation={this.props.navigation}  station={this.props.route.params}/>

				
				<View style={[tailwind('flex rounded-2xl'), { flex: 1, backgroundColor: background, zIndex: 10 }]}>
					<Text style={[{ color: btn_text }, typefaces.psb, tailwind('text-lg mt-2 ml-6')]}>
						Confirmar datos de compra
					</Text>

					<View style={tailwind('items-center h-full')}>
						{/*<View style={tailwind('mt-12')}>
							<Message />
						</View>*/}
						<View style={tailwind('mt-12')}>
							<Resume amount={amount} useGreen={false} showAmount />
						</View>
						<Modal
							isVisible={this.state.showConfirmCancel}
							animationIn="fadeIn"
							animationOut="fadeOut"
							backdropTransitionOutTiming={0}
							style={tailwind('flex items-center')}
						>
							<ConfirmCancel
								onCancel={this.cancel}
								onContinue={() => this.setState({ showConfirmCancel: false })}
							/>
						</Modal>
						<Modal
							isVisible={this.state.showModal}
							animationIn="fadeIn"
							animationOut="fadeOut"
							backdropTransitionOutTiming={0}
							style={tailwind('flex items-center')}
						>
							<View style={tailwind('w-full bg-white rounded-lg')}>
								{this.state.sending && <Wait />}
								{!this.state.sending && (
									<Done
										onDoneClose={this.onDoneClose}
										onDoneGoBuy={this.onDoneGoBuy}
										amount={amount}
										company={company}
										gas_station={gas_station}
										balance_id={balance_id}
									/>
								)}
							</View>
						</Modal>
						<View style={tailwind('mt-20 flex flex-row')}>
							<AppButton
								text={'Cancelar'}
								onPress={() => this.setState({ showConfirmCancel: true })}
								primary={false}
								disable={true}
							/>
							<AppButton text={'Aceptar'} onPress={this.accept} style={tailwind('ml-4')} />
						</View>
					</View>
				</View>
			</View>
		);
	}
}

function Wait(props) {
	return (
		<View style={tailwind('p-6 rounded-md')}>
			<Text style={[tailwind('text-xl ml-4'), typefaces.psb]}>Realizando la compra</Text>
			<View style={tailwind('h-32 flex flex-row justify-center')}>
				<ActivityIndicator color="black" size="large" animating />
			</View>
		</View>
	);
}

function Done({ amount, gas_station, onDoneClose, onDoneGoBuy }) {
	return (
		<View style={tailwind('p-6 rounded-md')}>
			<View style={tailwind('flex flex-row')}>
				{/*<CheckRoundedIcon />*/}
				<Text style={[tailwind('text-xl ml-4'), typefaces.psb]}>Compra completada</Text>
			</View>
			<View style={tailwind(' flex flex-row justify-evenly mt-4 ')}>
				<Image source={InfoIconp} style={[tailwind('w-20 h-20')]} />
			</View>
			<View style={tailwind('flex flex-row justify-center mt-8')}>
				<Text style={[tailwind('text-sm mb-2'), typefaces.pr, { color: info_text }]}>
					Se han recargado {' '}
						<Text style={[tailwind('text-sm mb-2'), typefaces.pr, { color: black }]}>${amount}</Text>
					{' '}en {' '}
						<Text style={[tailwind('text-sm mb-2'), typefaces.pr, { color: black }]}>{gas_station.name}</Text>
				</Text>
			</View>
			<View style={tailwind('flex flex-row justify-evenly mt-8')}>
				<AppButton text={'Cerrar'} onPress={onDoneClose} style={tailwind('mr-5')}/>
				<AppButton text={'Realizar recarga'} primary={false} onPress={onDoneGoBuy}/>
			</View>
		</View>
	);
}

const BackTitle = memo(({ navigation, station }) => {
	return (
		<View style={{ zIndex: 1 }}>
			<Ripple
				onPress={navigation.goBack}
				style={tailwind('rounded-full p-2 pl-2 w-12 items-center')}
				rippleCentered={true}
			>
				<SmallBackIcon />
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

function ConfirmCancel({ onCancel, onContinue }) {
	return (
		<View style={tailwind('w-full bg-white rounded-lg')}>
			<View style={tailwind('p-6 rounded-md')}>
				<View style={tailwind('flex flex-row')}>
					{/*<InfoIcon />*/}
					<Text style={[tailwind('text-xl ml-4'), typefaces.psb]}>
						¿Desea cancelar la recarga?
					</Text>
				</View>
				<View style={tailwind('flex flex-row justify-evenly mt-8')}>
					<AppButton text={'No'} primary={false} disable={true} onPress={onContinue} style={{ width: 100 }} />
					<AppButton text={'Si'} onPress={onCancel} style={{ width: 100 }}/>
				</View>
			</View>
		</View>
	);
}

function Message() {
	return (
		<View style={tailwind('flex flex-row bg-green-200 items-center rounded-lg px-5 py-3 w-full')}>
			<InfoIcon fill={'#38a169'} />
			<Text style={[tailwind('text-green-700 text-sm ml-3'), typefaces.pm]}>
				Confirmar datos de recarga
			</Text>
		</View>
	);
}

export default connect()(ConfirmTopupView);
