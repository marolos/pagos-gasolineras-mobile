import React, { memo } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import InfoIcon from '../icons/InfoIcon';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import BasicInput from '../shared/BasicInput';
import LoadingButton from '../shared/LoadingButton';
import VehiclesIdInput from './VehiclesIdInput';
import { FULL_WIDTH, FULL_HIGHT, CEDULA_REGEX, CHAR_REGEX } from '../utils/constants';
import { makeCancelable, equalForm, validForm } from '../utils/utils';
import SimpleToast from 'react-native-simple-toast';
import CitySelect from './CitySelect';
import Fetch from '../utils/Fetch';
import { connect } from 'react-redux';
import Ripple from 'react-native-material-ripple';
import BackIcon from '../icons/SmallBackIcon';
import FastImage from 'react-native-fast-image';
import { background, 
	white, 
	btn_text,
	info_text } from '../utils/colors';

import { handleRucCedula } from '../utils/validator';


class BillingDataView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			loadingData: true,
			form: {
				first_name: '',
				last_name: '',
				cedula: '',
				city: '',
				address: '',
				phone_number: '',
				vehicles_ids: [],
			},
		};
	}

	componentDidMount() {
		if (!this.props.user.ciudad) {
			this.loadData();
		} else {
			this.setState({ loadingData: false, form: this.props.user });
		}
	}

	componentWillUnmount() {
		this.request && this.request.cancel();
		this.saveRequest && this.saveRequest.cancel();
	}

	loadData = () => {
		const { user } = this.props;
		this.request = makeCancelable(
			Fetch.get('/users/billing/data/'),
			(res) => {
				this.setState({ loadingData: false, form: res.body });
				this.props.dispatch({ type: 'LOGIN', data: { ...user, ...res.body } });
			},
			(err) => {
				if (err.isCanceled) return;
				this.setState({ loadingData: false });
			},
		);
	};

	sendData = () => {
		Keyboard.dismiss();
		if (this.state.loading) return;
		const { navigation, route, user } = this.props;
		const { navigateToOnDone, ...data } = route.params;
		const { form } = this.state;

		const { valid, message } = validForm(form);
		if (!valid) {
			SimpleToast.show(message);
			return;
		}
		if (equalForm(user, form)) {
			if (navigateToOnDone === 'back') {
				navigation.goBack();
			} else {
				navigation.push(navigateToOnDone, data);
			}
			return;
		}
		this.setState({ loading: true });

		this.saveRequest = makeCancelable(
			Fetch.put('/users/billing/data/', form),
			(res) => {
				this.setState({ loading: false }, () => {
					if (navigateToOnDone === 'back') {
						navigation.goBack();
					} else {
						navigation.push(navigateToOnDone, data);
					}
				});
				this.props.dispatch({ type: 'LOGIN', data: { ...user, ...form } });
			},
			(err) => {
				if (err.isCanceled) return;
				console.log(err);
				if (err.status === 455) {
					SimpleToast.show('Ya existe otro registro con la placa: ' + err.body.error);
					this.setState({ loading: false });
					return;
				} else if (err.status === 400){
					SimpleToast.show('La cédula ingresada ya está en uso');
					this.setState({ loading: false });
					return;
				}
				this.setState({ loading: false, form: user });
			},
		);
	};

	render() {
		const formData = this.state.form;
		return (
			<View style={{ height: FULL_HIGHT, width: FULL_WIDTH, backgroundColor: white }}>
				{this.props.route.params.company ? (
					<View >
					<BackTitle navigation={this.props.navigation} station={this.props.route.params}/>
				</View>
				) : <BackTitle2 navigation={this.props.navigation}/>}
				<ScrollView 
					style={[tailwind('flex rounded-2xl pb-6'), { backgroundColor: background, zIndex: 10 }]}
					keyboardShouldPersistTaps="handled">
						<Text style={[{ color: btn_text }, typefaces.psb, tailwind('text-lg mt-2 ml-6')]}>
							Datos de facturación</Text>
					<View style={tailwind('items-center')}>
						<View style={styles.input.container}>
							<Text style={styles.input.text}>Nombres:</Text>
							<BasicInput
								defaultValue={formData.first_name}
								placeholder="Nombres"
								validate={(text) => text.length > 0}
								onChange={(text) =>
									this.setState(({ form }) => ({ form: { ...form, first_name: text } }))
								}
							/>
						</View>
						<View style={styles.input.container}>
							<Text style={styles.input.text}>Apellidos:</Text>
							<BasicInput
								defaultValue={formData.last_name}
								placeholder="Apellidos"
								validate={(text) => text.length > 0}
								onChange={(text) =>
									this.setState(({ form }) => ({ form: { ...form, last_name: text } }))
								}
							/>
						</View>
						<View style={styles.input.container}>
							<Text style={styles.input.text}>Cédula o pasaporte:</Text>
							<BasicInput
								defaultValue={formData.cedula}
								placeholder="Cédula o pasaporte"
								maxLength={10}
								keyboardType="numeric"
								validate={(text) =>
									text.length > 0 && !CHAR_REGEX.test(text) && handleRucCedula(text)
								}
								onChange={(text) =>
									this.setState(({ form }) => ({ form: { ...form, cedula: text } }))
								}
							/>
						</View>
						<View style={styles.input.container}>
							<Text style={styles.input.text}>Ciudad:</Text>
							<CitySelect
								defaultValue={formData.city}
								onChange={(text) =>
									this.setState(({ form }) => ({ form: { ...form, city: text } }))
								}
							/>
						</View>
						<View style={styles.input.container}>
							<Text style={styles.input.text}>Direccion:</Text>
							<BasicInput
								defaultValue={formData.address}
								placeholder="Direccion domiciliaria"
								validate={(text) => text.length > 0}
								onChange={(text) =>
									this.setState(({ form }) => ({ form: { ...form, address: text } }))
								}
							/>
						</View>
						<View style={styles.input.container}>
							<Text style={styles.input.text}>Teléfono:</Text>
							<BasicInput
								defaultValue={formData.phone_number}
								placeholder="n° de teléfono"
								validate={(text) => text.length > 0 && !CHAR_REGEX.test(text)}
								maxLength={10}
								keyboardType="numeric"
								onChange={(text) =>
									this.setState(({ form }) => ({
										form: { ...form, phone_number: text },
									}))
								}
							/>
						</View>
						<VehiclesIdInput
							defaultValue={formData.vehicles_ids}
							loading={this.state.loadingData}
							onChange={(items) =>
								this.setState(({ form }) => ({ form: { ...form, vehicles_ids: items } }))
							}
						/>
					</View>
					<View style={styles.button.container}>
						<LoadingButton
							text={this.props.route.params.company? "Siguiente" : "Guardar"}
							style={tailwind('w-40')}
							onPress={this.sendData}
							loading={this.state.loading}
						/>
					</View>
					{this.state.loadingData && <Spinner />}
				</ScrollView>
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
});

const BackTitle2 = memo(({ navigation }) => {
	return (
		<View style={{ zIndex: 1 }}>
			<Ripple
				onPress={navigation.goBack}
				style={tailwind('rounded-full p-2 w-12 items-center')}
				rippleCentered={true}
			>
				<BackIcon />
			</Ripple>
			<Text style={[tailwind('text-2xl ml-16 mb-4'), typefaces.pb]}>Editar Perfil</Text>
		</View>
	)
});

function Message() {
	return (
		<View style={tailwind('px-5 py-4')}>
			<View style={styles.message.view}>
				<InfoIcon fill={'#975a16'} />
				<Text style={styles.message.text}>
					Por favor verifica o completa tus datos de facturación
				</Text>
			</View>
		</View>
	);
}

function Spinner() {
	return (
		<View style={styles.spiner.view}>
			<ActivityIndicator
				animating={true}
				color="black"
				size="large"
				style={tailwind('p-0 m-0')}
			/>
		</View>
	);
}

const styles = {
	spiner: {
		view: [
			tailwind('absolute bg-gray-800 bg-opacity-50 flex justify-center'),
			{ width: FULL_WIDTH, height: FULL_HIGHT + 150 },
		],
	},
	message: {
		view: tailwind('flex flex-row bg-orange-200 items-center rounded-md px-4 py-2'),
		text: [tailwind('text-yellow-800 text-xs ml-3'), typefaces.pr],
	},
	input: {
		container: tailwind('w-64 my-2'),
		text: [tailwind('ml-2 text-sm'), typefaces.pr, { color: info_text }],
	},
	button: {
		container: tailwind('flex flex-row justify-end pr-6 mt-12 mb-16'),
	},
};

const mapStateToProps = ({ user }) => ({ user: user.data });

export default connect(mapStateToProps)(BillingDataView);
