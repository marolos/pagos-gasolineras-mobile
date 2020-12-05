import React from 'react';
import { View, TextInput, Text, ScrollView } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import tailwind from 'tailwind-rn';
import NextIcon from '../icons/NextIcon';
import { typefaces } from '../utils/styles';
import { formatExpiryDate } from '../utils/utils';
import CardNumberInput from '../shared/CardNumberInput';
import CheckBox from '../shared/CheckBox';
import { connect } from 'react-redux';
import { FULL_HIGHT } from '../utils/constants';
import SimpleToast from 'react-native-simple-toast';
import Fetch from '../utils/Fetch';

const initialState = {
	cardNumber: '',
	cvv: '',
	expiry: '',
	name: '',
	save: true,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'card_number':
			return { ...state, cardNumber: action.value };
		case 'expiry':
			return { ...state, expiry: action.value };
		case 'cvc':
			return { ...state, cvc: action.value };
		case 'name':
			return { ...state, name: action.value };
		case 'save':
			return { ...state, save: action.value };
		case 'loading':
			return { ...state, loading: true };
		case 'end_loading':
			return { ...state, loading: false };
	}
};

function AddCardView({ navigation, route, user }) {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	function next() {
		dispatch({ type: 'loading' });
		Fetch.post('/payment/user/card/', getCardObject(state))
			.then((res) => {
				dispatch({ type: 'end_loading' });
				navigation.navigate('confirmTopup', {
					...route.params,
					card: { ...res.body, save: state.save },
				});
			})
			.catch((err) => {
				SimpleToast.show('Datos incorrectos o tarjeta ya registrada.');
				dispatch({ type: 'end_loading' });
			});
	}
	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<View style={styles.addCard.view}>
				<View>
					<Text style={styles.holderText}>Nombre del titular:</Text>
					<CustomInput
						maxLength={100}
						containerStyle={styles.holderInputC}
						inputStyle={styles.holderInputI}
						placeholder="Ingresar nombre"
						onChange={(text) => dispatch({ type: 'name', value: text })}
					/>
				</View>
				<View style={styles.number.view}>
					<Text style={styles.number.text}>Tarjeta de crédito o débito:</Text>
					<CardNumberInput
						onChange={(text) => dispatch({ type: 'card_number', value: text })}
					/>
				</View>
				<View style={styles.addCard.view0}>
					<View style={styles.cvc.view}>
						<Text style={styles.cvc.text}>CVC: </Text>
						<CustomInput
							maxLength={3}
							containerStyle={styles.cvc.inputC}
							inputStyle={styles.cvc.inputI}
							placeholder="cvc"
							keyboardType="numeric"
							onChange={(text) => dispatch({ type: 'cvc', value: text })}
						/>
					</View>
					<View style={styles.exp.view}>
						<Text style={styles.exp.text}>Expiración: </Text>
						<CustomInput
							maxLength={5}
							containerStyle={styles.exp.inputC}
							format={(currentText, text) => formatExpiryDate(currentText, text)}
							inputStyle={styles.exp.inputI}
							placeholder="mm/aa"
							keyboardType="numeric"
							onChange={(text) => dispatch({ type: 'expiry', value: text })}
						/>
					</View>
				</View>
				<View style={styles.save}>
					<Text style={styles.saveText}>Guardar la tarjeta</Text>
					<CheckBox
						onChange={(value) => dispatch({ type: 'save', value: value })}
						defaultValue={state.save}
					/>
				</View>
				<View style={styles.nextView}>
					<LoadingButton
						icon={<NextIcon />}
						iconPos={'right'}
						text="continuar"
						style={styles.nextButton}
						onPress={next}
						loading={state.loading}
					/>
				</View>
			</View>
		</ScrollView>
	);
}

function getCardObject(state) {
	const expiry = state.expiry.split('/');
	return {
		number: state.cardNumber.replace(/\s/g, ''),
		cvc: state.cvc,
		expiry_month: parseInt(expiry[0]),
		expiry_year: 2000 + parseInt(expiry[1]),
		holder_name: state.name,
	};
}

function CustomInput({
	onChange,
	maxLength,
	containerStyle,
	inputStyle,
	placeholder,
	keyboardType,
	format,
}) {
	const [currentText, setCurrentText] = React.useState('');
	const [editing, setEditing] = React.useState(false);
	return (
		<View
			style={[
				styles.customInput.view,
				editing ? styles.customInput.editing : styles.customInput.noEditing,
				containerStyle ? containerStyle : {},
			]}
		>
			<TextInput
				value={currentText}
				keyboardType={keyboardType || 'default'}
				placeholder={placeholder}
				maxLength={maxLength || 200}
				onChangeText={(text) => {
					if (format) text = format(currentText, text);
					if (onChange) onChange(text);
					setCurrentText(text);
				}}
				style={[styles.customInput.input, inputStyle ? inputStyle : {}]}
				onFocus={(e) => setEditing(true)}
				onEndEditing={(e) => setEditing(false)}
			/>
		</View>
	);
}

const styles = {
	holderText: [tailwind('ml-2 text-sm'), typefaces.pm],
	holderInputI: tailwind('w-64'),
	holderInputC: tailwind('w-full'),
	number: { view: tailwind('mt-4'), text: [tailwind('ml-2 text-sm'), typefaces.pm] },
	cvc: {
		view: tailwind('w-2/5'),
		text: [tailwind('ml-2 text-sm'), typefaces.pm],
		inputI: tailwind('w-20'),
		inputC: tailwind('w-full'),
	},
	exp: {
		view: tailwind('w-1/2'),
		text: [tailwind('ml-2 text-sm'), typefaces.pm],
		inputI: tailwind('w-24'),
		inputC: tailwind('w-full'),
	},
	addCard: {
		view: { position: 'relative', flex: 1, height: FULL_HIGHT - 40, padding: 24 },
		view0: tailwind('flex flex-row justify-between mt-4'),
	},
	customInput: {
		view: tailwind('rounded-md border-2 border-gray-200 pl-4'),
		editing: tailwind('bg-white border-2 border-gray-600'),
		noEditing: tailwind('bg-gray-200'),
		input: tailwind('w-12 text-base'),
	},
	save: tailwind('flex flex-row justify-end mt-12'),
	saveText: [tailwind('mr-2'), typefaces.pm],
	nextView: tailwind('absolute bottom-0 right-0'),
	nextButton: tailwind('w-48 self-end mr-6 mb-12'),
};

export default connect((state) => ({ user: state.user.data }))(AddCardView);
