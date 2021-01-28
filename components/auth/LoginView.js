import React, { memo } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TextInput,
	ActivityIndicator,
	Keyboard,
	Image,
	ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import LoadingButton from '../shared/LoadingButton';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import TextButton from '../shared/TextButton';
import FacebookButton from '../shared/FacebookButton';
import { authRequest } from '../redux/auth/actions';
import SimpleToast from 'react-native-simple-toast';
import { EMAIL_REGEX } from '../utils/constants';
import fondo from '../../assets/img/fondo.png';
import logo from '../../assets/img/logo.png';
import { FULL_WIDTH, FULL_HIGHT } from '../utils/constants';
import Ripple from 'react-native-material-ripple';
import { EyeOff, Eye } from './icons';

class LoginView extends React.Component {
	state = {
		loading: false,
		showModal: false,
		hasEmailError: false,
		credentials: {
			identifier: '',
			password: '',
		},
		sent1: false,
		showPass: false,
	};

	onLogin = () => {
		Keyboard.dismiss();
		this.setState({ loading: true, sent1: true });
		const { identifier, password } = this.state.credentials;
		if (!identifier || !password) {
			SimpleToast.showWithGravity('Ingrese sus credenciales.', 1500, SimpleToast.CENTER);
			this.setState({ loading: false });
			return;
		}
		if (!EMAIL_REGEX.test(identifier)) {
			SimpleToast.showWithGravity('Ingrese un correo válido.', 1500, SimpleToast.CENTER);
			this.setState({ loading: false, hasEmailError: true });
			return;
		}
		this.props.dispatch(
			authRequest(
				'/auth/local/',
				this.state.credentials,
				(res) => {},
				(err) => {
					if (err.status === 401 || err.status === 403) SimpleToast.show('Datos incorrectos.');
					else SimpleToast.show('Error al iniciar sesión.');
					this.setState({ loading: false });
				},
			),
		);
	};

	onFacebookLogin = (user_access_token) => {
		this.setState({ showModal: true });
		this.props.dispatch(
			authRequest(
				'/users/signup/facebook/',
				{ token: user_access_token },
				(res) => {},
				() => {
					this.setState({ showModal: false });
					SimpleToast.show('Error al iniciar sesión.');
				},
			),
		);
	};

	onChangeEmail = (text) => {
		this.setState((state) => ({
			credentials: { ...state.credentials, identifier: text },
			hasEmailError: !EMAIL_REGEX.test(text) && state.sent1,
		}));
	};

	onChangePassword = (text) => {
		this.setState((state) => ({
			credentials: { ...state.credentials, password: text },
		}));
	};

	navigateTo = (option) => {
		//this.setState();
		console.log(FULL_HIGHT);
		this.props.navigation.push(option);
	};

	switchShow = ()=> {
		this.setState(({showPass})=> ({showPass: !showPass}))
	}

	render() {
		return (
			<ScrollView keyboardShouldPersistTaps="handled">
				<View style={tailwind('absolute')}>
					<Image source={fondo} style={{ width: FULL_WIDTH, height: FULL_HIGHT }} />
				</View>
				<View style={tailwind('items-center items-center w-full')}>
					<Logo />
					<View style={[tailwind('flex rounded-t-2xl py-3 bg-white h-full px-6 w-full')]}>
						<View style={tailwind('mx-4')}>
							<TextInput
								style={[
									tailwind('rounded-3xl border w-full pl-5 mt-10'),
									this.state.hasEmailError ? tailwind('border-2 border-red-400') : {},
									typefaces.pm,
								]}
								placeholder="Correo Electrónico"
								onChangeText={this.onChangeEmail}
							/>
							<View>
								<TextInput
									style={[tailwind('rounded-3xl border w-full pl-5 mt-4'), typefaces.pm]}
									placeholder="Contraseña"
									secureTextEntry={!this.state.showPass}
									onChangeText={this.onChangePassword}
								/>
								<Ripple
									style={[
										tailwind(
											'absolute rounded-full w-8 h-8 flex flex-col justify-center items-center',
										),
										{ top: 28, right: 20 },
									]}
									onPress={this.switchShow}
									rippleDuration={250}
									rippleCentered
								>
									{this.state.showPass ? <Eye /> : <EyeOff />}
								</Ripple>
							</View>
						</View>
						<View style={tailwind('flex flex-row justify-end')}>
							<ResetPassMessage navigateTo={this.navigateTo} />
						</View>
						<View style={tailwind('items-center')}>
							<LoginButton onPress={this.onLogin} loading={this.state.loading} />
							<View style={tailwind('border-t w-full mt-8')} />
							<FacebookButton onFacebookLogin={this.onFacebookLogin} />
						</View>
						<View style={tailwind('items-center mt-6')}>
							<SignupMessage navigateTo={this.navigateTo} />
						</View>
					</View>
				</View>
				<LoadingModal show={this.state.showModal} />
			</ScrollView>
		);
	}
}

const LoginButton = memo(({ onPress, loading }) => (
	<View style={tailwind('mt-5')}>
		<LoadingButton text="Iniciar Sesión" onPress={onPress} loading={loading} />
	</View>
));

const LoadingModal = memo(({ show }) => (
	<Modal
		isVisible={show}
		animationIn="fadeIn"
		animationOut="fadeOut"
		backdropTransitionOutTiming={0}
		style={tailwind('w-full flex items-center m-0')}
	>
		<View style={tailwind('flex flex-row w-56 h-56 rounded bg-white justify-center')}>
			<ActivityIndicator size="large" animating={show} color="black" />
		</View>
	</Modal>
));

const SignupMessage = memo(({ navigateTo }) => (
	<View style={tailwind('flex flex-row items-center')}>
		<Text style={[tailwind('text-sm mr-1')]}>¿Nuevo Usuario?</Text>
		<TextButton
			text="¡Regístrate aquí!"
			onPress={() => navigateTo('signup')}
			style={tailwind('text-sm mt-1')}
		/>
	</View>
));

const ResetPassMessage = memo(({ navigateTo }) => (
	<View>
		<TextButton
			text="¿Olvidaste tu contraseña?"
			onPress={() => navigateTo('resetpass')}
			style={tailwind('text-xs')}
		/>
	</View>
));

const Logo = memo(() => (
	<View style={tailwind('flex flex-row justify-center items-center my-8 mb-12 mt-16')}>
		<Image source={logo} style={tailwind('w-48 h-12')} />
	</View>
));

export default connect()(LoginView);
