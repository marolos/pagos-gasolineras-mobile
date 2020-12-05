import React, { memo } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import LoadingButton from '../shared/LoadingButton';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import TextButton from '../shared/TextButton';
import UserLoginIcon from '../icons/UserLoginIcon';
import PasswordLoginIcon from '../icons/PasswordLoginIcon';
import FacebookButton from '../shared/FacebookButton';
import { authRequest } from '../redux/auth/actions';
import SimpleToast from 'react-native-simple-toast';
import { EMAIL_REGEX } from '../utils/constants';

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
		this.props.navigation.push(option);
	};

	render() {
		return (
			<View>
				<View style={tailwind('items-center items-center w-full')}>
					<Logo />
					<View style={tailwind('flex flex-row')}>
						<UserLoginIcon style={tailwind('mt-5')} width={16} height={20} />
						<TextInput
							style={[
								tailwind('bg-gray-200 rounded-md w-64 m-2 pl-5'),
								this.state.hasEmailError ? tailwind('border-2 border-red-400') : {},
								typefaces.pm,
							]}
							placeholder="email"
							onChangeText={this.onChangeEmail}
						/>
					</View>
					<View style={tailwind('flex flex-row')}>
						<PasswordLoginIcon style={tailwind('mt-5')} width={18} height={23} />
						<TextInput
							style={[tailwind('bg-gray-200 rounded-md w-64 m-2 pl-5'), typefaces.pm]}
							placeholder="contraseña"
							secureTextEntry={true}
							onChangeText={this.onChangePassword}
						/>
					</View>
					<LoginButton onPress={this.onLogin} loading={this.state.loading} />
					<ResetPassMessage navigateTo={this.navigateTo} />
					<SignupMessage navigateTo={this.navigateTo} />
					<FacebookButton onFacebookLogin={this.onFacebookLogin} />
				</View>
				<LoadingModal show={this.state.showModal} />
			</View>
		);
	}
}

const LoginButton = memo(({ onPress, loading }) => (
	<View style={tailwind('mt-8')}>
		<LoadingButton text="Iniciar sesión" onPress={onPress} loading={loading} />
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
	<View style={tailwind('flex flex-row items-center mt-4')}>
		<Text style={[typefaces.pr, { marginRight: 10 }]}>¿No tienes cuenta?</Text>
		<TextButton
			text="Regístrate"
			onPress={() => navigateTo('signup')}
			style={{ textDecorationLine: 'underline' }}
		/>
	</View>
));

const ResetPassMessage = memo(({ navigateTo }) => (
	<View style={tailwind('mt-8')}>
		<TextButton
			text="¿Olvidaste tu contraseña?"
			onPress={() => navigateTo('resetpass')}
			style={{ textDecorationLine: 'underline' }}
		/>
	</View>
));

const Logo = memo(() => (
	<View style={tailwind('flex flex-row justify-center items-center my-8 mt-20 flex')}>
		<Text style={[tailwind('text-gray-800 text-2xl'), typefaces.psb]}>Fuel</Text>
		<Text style={[tailwind('text-gray-600 text-2xl'), typefaces.psb]}>pay</Text>
	</View>
));

export default connect()(LoginView);
