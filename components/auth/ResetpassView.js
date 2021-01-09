import React, { memo } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import LoadingButton from '../shared/LoadingButton';
import { typefaces } from '../utils/styles';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, FULL_HIGHT, EMAIL_REGEX } from '../utils/constants';
import BackIcon from '../icons/SmallBackIcon';
import BasicInput from '../shared/BasicInput';
import Ripple from 'react-native-material-ripple';
import SimpleToast from 'react-native-simple-toast';
import Fetch from '../utils/Fetch';
import Button from '../shared/AppButton';
import InfoIcon from '../../assets/img/popup.png'
import fondo from '../../assets/img/fondo.png';
import logo from '../../assets/img/logo.png';
import { info_text } from '../utils/colors';

class ResetpassView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allValidated: false,
			loading: false,
			showModal: false,
			information: {
				email: '',
			},
		};
	}

	onRegister = () => {
		Keyboard.dismiss();
		if (this.state.loading) return;

		const {
			information: { email },
		} = this.state;

		if (!email) {
			SimpleToast.show('Por ingrese un correo electronico.');
			this.setState({ loading: false });
			return;
		}

		if (!EMAIL_REGEX.test(email)) {
			SimpleToast.show('Ingrese un correo válido');
			this.setState({ loading: false });
			return;
		}

		this.setState({ loading: true });
		const data = {
			email: email,
		};

		Fetch.post('/users/reset/password/', data)
			.then((resp) => {
				SimpleToast.show('Exito, ' + resp['body']['msg']);
				this.setState({ loading: false, showModal: true });
			})
			.catch((error) => {
				if (error.status === 400) SimpleToast.show('Error al intentar enviar el correo.');
				this.setState({ loading: false });
			});
	};

	render() {
		return (
			<View>
				<View style={tailwind('absolute')}>
					<Image source={fondo} style={{ width: FULL_WIDTH, height: FULL_HIGHT }}/>
				</View>
				<View>
					<Ripple
						onPress={() => this.props.navigation.goBack()}
						style={tailwind('p-4 w-12 h-12')}
						rippleCentered={true}
					>
						<BackIcon fill="white"/>
					</Ripple>
				</View>
				<View style={[tailwind('items-center w-full'), { height: FULL_HIGHT }]}>
					<Logo/>
					<View style={[tailwind('flex rounded-t-2xl py-3 bg-white h-full px-6'), { width: FULL_WIDTH - 30 }]}>
						<View style={tailwind('pt-20 mx-4')}>
							<View style={[tailwind('items-center')]}>
								<Text style={[typefaces.pr, tailwind('text-center')]}>
								Ingresa tu correo electrónico para recuperar tu contraseña
								</Text>
							</View>
							<View style={tailwind('mt-10 items-center')}>
								<BasicInput
									placeholder="Correo Electrónico"
									onChange={(text) =>
										this.setState((state) => ({
											information: { ...state.information, email: text },
										}))
									}
									style={tailwind('my-1')}
									validate={(text) => EMAIL_REGEX.test(text)}
								/>
							</View>
							<View style={tailwind('mt-10 items-center')}>
								<LoadingButton
									text={'Recuperar'}
									onPress={this.onRegister}
									loading={this.state.loading}
								/>
							</View>
						</View>
					</View>
				</View>

				<Modal
					isVisible={this.state.showModal}
					animationIn="fadeIn"
					animationOut="fadeOut"
					backdropTransitionOutTiming={0}
					style={tailwind('flex items-center mx-3')}
				>
					<View style={tailwind('w-full bg-white rounded-lg')}>
						<View style={tailwind('p-6 rounded-md')}>
							<View style={tailwind('flex flex-row')}>
								<Text style={[tailwind('text-3xl ml-4'), typefaces.psb]}>Listo</Text>
							</View>
							<View style={tailwind('flex flex-row justify-center')} >
								<Image source={InfoIcon} style={{ width: 70, height: 70 }}/>
							</View>
							<View>
								<View style={tailwind('p-2 pt-5')}>
									<Text style={[typefaces.pr, tailwind('text-center'), { color: info_text }]}>
										Si el correo se encuentra registrado debería recibir un correo electrónico.
									</Text>
								</View>
							</View>

							<View style={tailwind('flex flex-row justify-evenly mt-4')}>
								<Button
									text={'Cerrar'}
									onPress={() => {
										this.setState({ showModal: false });
									}}
								/>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}


const Logo = memo(() => (
	<View style={tailwind('flex flex-row justify-center items-center my-8 mt-12 mb-24 flex')}>
		<Image source={logo} style={tailwind('w-64 h-16')}/>
	</View>
));


export default connect()(ResetpassView);
