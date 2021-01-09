import React, { memo } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, Keyboard } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import { typefaces } from '../utils/styles';
import tailwind from 'tailwind-rn';
import { FULL_WIDTH, FULL_HIGHT, EMAIL_REGEX, PASSWORD_REGEX } from '../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';
import BackIcon from '../icons/SmallBackIcon';
import { authRequest } from '../redux/auth/actions';
import { passwordValidator } from '../utils/utils';
import BasicInput from '../shared/BasicInput';
import PasswordInput from './PasswordInput';
import Ripple from 'react-native-material-ripple';
import SimpleToast from 'react-native-simple-toast';
import InfoIcon from '../../assets/img/popup.png'
import fondo from '../../assets/img/fondo.png';
import logo from '../../assets/img/logo.png';

class SignupView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allValidated: false,
			loading: false,
			information: {
				first_name: '',
				last_name: '',
				email: '',
				password1: '',
				password2: '',
			},
		};
	}

	onRegister = () => {
		Keyboard.dismiss();
		if (this.state.loading) return;

		const {
			information: { first_name, last_name, email, password1, password2 },
		} = this.state;

		if (!first_name || !last_name || !email || !password1) {
			SimpleToast.show('Por favor llene todos los campos.');
			this.setState({ loading: false });
			return;
		}

		if (!EMAIL_REGEX.test(email)) {
			SimpleToast.show('Ingrese un correo válido');
			this.setState({ loading: false });
			return;
		}

		const passValid = passwordValidator(password1, password2);
		if (!passValid.isValid) {
			SimpleToast.show(passValid.message);
			this.setState({ loading: false });
			return;
		}

		this.setState({ loading: true });
		const data = {
			email: email,
			first_name: first_name,
			last_name: last_name,
			password: password1,
		};

		this.props.dispatch(
			authRequest(
				'/users/signup/',
				data,
				(res) => { },
				(err) => {
					if (err.status === 409) SimpleToast.show('Usuario ya existe.');
					else SimpleToast.show('Error al registrar el usuario');
					this.setState({ loading: false });
				},
			),
		);
	};

	render() {
		return (
			<View style={{ height: FULL_HIGHT, width: FULL_WIDTH}}>
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
				<View style={[tailwind('items-center'), { height: FULL_HIGHT }]}>
					<Logo />
					<View style={[tailwind('flex rounded-t-2xl py-3 bg-white h-full px-6'), { width: FULL_WIDTH - 30 }]}>
						<ScrollView
						   style={[tailwind('flex rounded-2xl my-2')]}
						   contentInset={0, 0, 0, 0}
						>
							<View>
								<Text style={[tailwind('text-3xl'), typefaces.psb]}>Crear Cuenta</Text>
							</View>
							<View style={tailwind('items-center mt-4')}>
								<BasicInput
									placeholder="Nombres"
									onChange={(text) =>
										this.setState((state) => ({
											information: { ...state.information, first_name: text },
										}))
									}
									style={tailwind('mb-5')}
									validate={(text) => text.length > 0}
								/>
								<BasicInput
									placeholder="Apellidos"
									onChange={(text) =>
										this.setState((state) => ({
											information: { ...state.information, last_name: text },
										}))
									}
									style={tailwind('mb-5')}
									validate={(text) => text.length > 0}
								/>
								<BasicInput
									placeholder="Correo Electrónico"
									onChange={(text) =>
										this.setState((state) => ({
											information: { ...state.information, email: text },
										}))
									}
									style={tailwind('mb-5')}
									validate={(text) => EMAIL_REGEX.test(text)}
								/>
								<PasswordInput
									placeholder="Contraseña"
									onChange={(text) =>
										this.setState((state) => ({
											information: { ...state.information, password1: text },
										}))
									}
									style={tailwind('mb-5')}
									validate={(text) => PASSWORD_REGEX.test(text)}
								/>
								<PasswordInput
									placeholder="Confirmar contraseña"
									onChange={(text) =>
										this.setState((state) => ({
											information: { ...state.information, password2: text },
										}))
									}
									style={tailwind('mb-5')}
									validate={(text) => PASSWORD_REGEX.test(text)}
								/>
							</View>
							<View style={tailwind('mt-10 items-center')}>
								<LoadingButton
									text={'Registrarse'}
									onPress={this.onRegister}
									loading={this.state.loading}
								/>
							</View>
						</ScrollView>
					</View>
				</View>
			</View>
		);
	}
}


const Logo = memo(() => (
	<View style={tailwind('flex flex-row justify-center items-center mb-8 flex')}>
		<Image source={logo} style={tailwind('w-64 h-16')}/>
	</View>
));


export default connect()(SignupView);
