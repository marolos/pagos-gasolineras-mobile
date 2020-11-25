import {
	IVA_RATE,
	COMMISION,
	CEDULA_REGEX,
	CHAR_REGEX,
	ALPHANUMERIC,
	MAPBOX_API_URL,
	MAPBOX_TOKEN,
} from './constants';
import { FetchClass } from './Fetch';
import { cities } from './mocks';

/**
 * Create an array with chunks of the given array with equal chunkSize
 * ex: createChunks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3)
 * 	return [[1,2,3], [4,5,6], [7,8,9], [10,11]]
 * @param {Array} array the array
 * @param {Number} chunkSize the max size of each chunk
 */
export function createChunks(array, chunkSize) {
	const chunks = [];
	const n = array.length;
	let i = 0;

	while (i < n) {
		chunks.push(array.slice(i, (i += chunkSize)));
	}
	return chunks;
}

/**
 * Perform the same action as the above function, but with strings
 * ex: createStringChunks('abcdefghijk', 3)
 * 	return ['abc', 'def', 'ghi', 'jk']
 * @param {String} string
 * @param {Number} chunkSize
 */
export function createStringChunks(string, chunkSize) {
	return string.replace(/\s/g, '').match(new RegExp(`.{1,${chunkSize}}`, 'g'));
}

/**
 * Convert the text to credit card expiry date format (mm/yy).
 * ex:
 * 	225 --> 02/25
 * 	1105 --> 11/05
 * @param {String} currentText
 * @param {String} text
 */
export function formatExpiryDate(currentText, text) {
	if (currentText.length > text.length) {
		if (text.slice(-1) === '/') return text.slice(0, 1);
		return text;
	}

	const value = parseInt(text);
	if (text.length === 1) {
		if (value === 1) return text;
		if (value > 1) return '0' + text + '/';
	}
	if (text.length === 2) {
		if (value > 12) return text.slice(0, 1);
		return text + '/';
	}
	return text;
}

export function passwordValidator(pass1, pass2) {
	const passwordStatus = {
		message: '',
		isValid: false,
	};

	if (pass1.length < 8) {
		passwordStatus.message =
			'La contraseña debe tener al menos 8 caracteres, un número, y un caracter especial';
		return passwordStatus;
	}
	if (pass1.trim() !== pass2.trim()) {
		passwordStatus.message = 'Las contraseñas no coinciden';
		return passwordStatus;
	}
	passwordStatus.isValid = true;
	return passwordStatus;
}

export function randomInt(max = 10000000) {
	return Math.floor(Math.random() * max);
}

export function randomString(length = 6) {
	let count = Math.floor(length);
	if (count <= 0) return '';
	const result = [];
	while (count-- > 0) {
		const index = randomInt(ALPHANUMERIC.length);
		result.push(ALPHANUMERIC.charAt(index));
	}
	return result.join('');
}

/**
 * Allow to execute a promise without side effects.
 * It doesn't cancel the request at all, just don't execute the resolve function
 * when the promise is done and the function cancel() is called.
 * It's usefull when performing an update state in the resolve function
 * but sometimes you need to unmount the component. This way, you can use the cancel() function as a cleanup
 * on componentWillUnmout() or on the cleanup function on your React.useEffect()
 * @param {} promise the promise to execute
 * @param {*} resolve the resolve function to the promise
 * @param {*} reject the function to handle errors.
 */
export function makeCancelable(promise, resolve, reject) {
	let hasCanceled_ = false;

	promise
		.then((val) => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)))
		.catch((error) => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error)));

	return {
		cancel() {
			hasCanceled_ = true;
		},
	};
}

/**
 * Compare the actual Billing data of a user with the new value if it has changed.
 * This function is just for that specific case.
 * @param {Object} actualValue
 * @param {Object} newValue
 */
export function equalForm(actualValue, newValue) {
	return (
		actualValue.first_name === newValue.first_name.trim() &&
		actualValue.last_name === newValue.last_name.trim() &&
		actualValue.cedula === newValue.cedula.trim() &&
		actualValue.city === newValue.city.trim() &&
		actualValue.address === newValue.address.trim() &&
		actualValue.phone_number === newValue.phone_number.trim() &&
		equalVehiclesIds(actualValue.vehicles_ids, newValue.vehicles_ids)
	);
}

export function equalVehiclesIds(actualValues, newValues) {
	if (actualValues.length !== newValues.length) return false;
	actualValues.forEach((value) => {
		const result = newValues.find(
			(e) => e.number.toLowerCase().trim() === value.number.toLowerCase().trim(),
		);
		if (!result) return false;
	});
	newValues.forEach((value) => {
		const result = actualValues.find(
			(e) => e.number.toLowerCase().trim() === value.number.toLowerCase().trim(),
		);
		if (!result) return false;
	});

	return true;
}

export function validForm(form) {
	if (
		!(
			form.first_name &&
			form.last_name &&
			form.cedula &&
			form.city &&
			form.address &&
			form.phone_number &&
			form.vehicles_ids.length > 0
		)
	) {
		return { valid: false, message: 'Debe completar todos los campos' };
	}

	if (!CEDULA_REGEX.test(form.cedula) || CHAR_REGEX.test(form.cedula)) {
		return { valid: false, message: 'Ingrese un número válido de cédula' };
	}
	if (CHAR_REGEX.test(form.phone_number)) {
		return { valid: false, message: 'Ingrese un número válido de teléfono' };
	}
	if (!cities.find((city) => city.name.toLowerCase() === form.city.toLowerCase())) {
		return { valid: false, message: 'Ingrese una ciudad válida.' };
	}
	return { valid: true };
}

export function getOrderByAmount(amount) {
	const x = amount / (100 + IVA_RATE);

	return {
		vat: (IVA_RATE * x).toFixed(2),
		taxable_amount: (100 * x).toFixed(2),
		amount: amount + COMMISION,
	};
}

export function sortByDate(key, ascendent = false) {
	if (ascendent) return (a, b) => Date.parse(a[key]) - Date.parse(b[key]);
	return (a, b) => Date.parse(b[key]) - Date.parse(a[key]);
}

export function sleep(delay = 100) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}

export async function getMapboxRoute(start, end) {
	const response = await new FetchClass(
		null,
	).get(
		`https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}`,
		{ access_token: MAPBOX_TOKEN, steps: true },
	);
	const { routes } = response.body;
	const steps = [];
	if (routes && routes[0] && routes[0].legs) {
		routes[0].legs[0].steps.forEach((step) => {
			step.intersections.forEach((inter) => {
				steps.push(inter.location);
			});
		});
		const routeResult = [[start, steps[0]]];
		for (let i = 0; i < steps.length - 1; i++) {
			routeResult.push([steps[i], steps[i + 1]]);
		}
		return routeResult;
	}

	return [];
}
