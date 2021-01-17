import { Dimensions } from 'react-native';

export const doDirtyShit = () => {
	if (process.env.NODE_ENV !== 'development') {
		console.log = () => {};
		console.error = () => {};
		console.warn = () => {};
	}
};

export const REST_API_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000'
		: 'https://fuelpay.azurewebsites.net';

export const MAPBOX_API_URL = 'https://api.mapbox.com';

export const ENCRYPTOR_KEY = 'MIIEowIBAAKA2LCcVqUelTOc6TwslUAm8vxnoCAQEt3hhlv8FjvjmZGqJ';
export const MAPBOX_TOKEN =
	'sk.eyJ1IjoibWlndWVscXVvIiwiYSI6ImNraGYyeGZ1eTA1bHkzMHBhZnpwcWV2YzQifQ.-DgT0S5tfdVKQuPHcVv9-A';
//export const MAPBOX_TOKEN = 'pk.eyJ1IjoiZnVlbHBheSIsImEiOiJja2hibTd2bmgwMTRuMnNxamQ5eThheWttIn0.8oO_NxO2GcZDbOi4YvJF_w'
export const MAP_CENTER = [-79.891971, -2.171499];

export const theme = {
	dark: false,
	colors: {
		primary: '#000',
		background: '#fff',
		card: '#fff',
		text: '#000',
		border: '#efefef',
		notification: 'rgb(255, 69, 58)',
	},
};

export const FULL_WIDTH = Dimensions.get('window').width;
export const FULL_HIGHT = Dimensions.get('window').height;

export const ADS_MAX_HEIGHT = 200;

export const ADD_VALUE_STEP = 10.0;

export const ALPHANUMERIC = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEX = /^.{6,20}$/;
export const CEDULA_REGEX = /^((0[1-9])|(1[0-9])|([2][0-4])|(30))[0-9]{8}$/;
export const CHAR_REGEX = /[a-zA-Z@\!#$\+%^&\*\(\)\,;\:\.\<\>\\@\/\-\-\_]/;
export const FLOAT_FIXED_2 = /^(\d*\.?)(\d{1,2})?/;

export const VISA_REGEX = /^[4]/;
export const MASTERCARD_REGEX = /^[5][1-5]/;
export const AMEX_REGEX = /^3[47]/;

export const IVA_RATE = 12;
export const COMMISION = 0.25;

export const NotificationType = {
	CHANGE_PRIVACY_POLICES: 'change_privacy_polices',
	PURCHASE_DONE: 'purchase_done',
	TIP: 'tip',
	ADVERTISEMENT: 'advertisement',
	DISABLE_USER: 'disable_user',
	TRANSFER: 'trasfer',
	REPLY: 'reply',
};
