import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
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
			<View style={tailwind('items-center h-full')}>
				<View style={tailwind('mt-12')}>
					<Message />
				</View>
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
					<View style={tailwind('w-full h-56 bg-white rounded-lg')}>
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
				<View style={tailwind('absolute bottom-0 right-0 mb-8 mr-8 flex flex-row')}>
					<Button
						text={'cancelar'}
						onPress={() => this.setState({ showConfirmCancel: true })}
						primary={false}
					/>
					<Button text={'recargar'} onPress={this.accept} style={tailwind('ml-4')} />
				</View>
			</View>
		);
	}
}

function Wait(props) {
	return (
		<View style={tailwind('p-6 rounded-md')}>
			<Text style={[tailwind('text-base'), typefaces.pm]}>Realizando la recarga.</Text>
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
				<CheckRoundedIcon />
				<Text style={[tailwind('text-base ml-4'), typefaces.psb]}>Hecho</Text>
			</View>
			<View style={tailwind('flex flex-row justify-center mt-8')}>
				<Text style={[tailwind('text-sm'), typefaces.pm]}>
					Se han recargado ${amount} en {gas_station.name}
				</Text>
			</View>
			<View style={tailwind('flex flex-row justify-evenly mt-8')}>
				<Button text={'cerrar'} primary={false} onPress={onDoneClose} style={{ width: 100 }} />
				<Button text={'realizar compra'} onPress={onDoneGoBuy} style={{ width: 150 }} />
			</View>
		</View>
	);
}

function ConfirmCancel({ onCancel, onContinue }) {
	return (
		<View style={tailwind('w-full bg-white rounded-lg')}>
			<View style={tailwind('p-6 rounded-md')}>
				<View style={tailwind('flex flex-row')}>
					<InfoIcon />
					<Text style={[tailwind('text-sm ml-4'), typefaces.psb]}>
						¿Desea cancelar la recarga?
					</Text>
				</View>
				<View style={tailwind('flex flex-row justify-evenly mt-8')}>
					<Button text={'no'} primary={false} onPress={onContinue} style={{ width: 100 }} />
					<Button text={'si'} onPress={onCancel} />
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
