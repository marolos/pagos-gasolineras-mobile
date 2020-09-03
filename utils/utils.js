import { IVA_RATE, COMMISION, CEDULA_REGEX, CHAR_REGEX } from './constants';
import { cities } from './mocks';

/**
 * Create an array with chunks of the given array with equal chunkSize
 * ex: createChunks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3)
 * 	return [[1,2,3], [4,5,6], [7,8,9], [10,11]]
 * @param {} array the array
 * @param {*} chunkSize the max size of each chunk
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
 * @param {} string
 * @param {*} chunkSize
 */
export function createStringChunks(string, chunkSize) {
   return string.replace(/\s/g, '').match(new RegExp(`.{1,${chunkSize}}`, 'g'));
}

/**
 * Convert the text to credit card expiry date format (mm/yy).
 * ex:
 * 	225 -> 02/25
 * 	1105 -> 11/05
 * @param {} currentText
 * @param {*} text
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
   const status = {
      message: '',
      isValid: false,
   };
   if (pass1.length < 8) {
      status.message =
         'La contraseña debe tener al menos 8 caracteres, un numero, y un caracter especial';
      return status;
   }
   if (pass1 != pass2) {
      status.message = 'Las contraseñas no coinciden';
      return status;
   }
   status.isValid = true;
   return status;
}

export function randomInt() {
   const max = 10000000;
   return Math.floor(Math.random() * max);
}

/**
 * Make a promise to execute without side effects.
 * It doesn't cancel the request at all, just don't execute the resolve
 * function when the promise is done and the function cancel() is called.
 * It's usefull when you have need to perform a react state update when the promise ends
 * but sometimes you need to unmount the component. This way if you can use the cancel() as a cleanup function
 * on componentWillUnmout() or if you are using react hooks you can use it on the cleanup function on your React.useEffect() function
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
 * @param {*} actualValue
 * @param {*} newValue
 */
export function equalForm(actualValue, newValue) {
   return (
      actualValue.first_name == newValue.first_name &&
      actualValue.last_name == newValue.last_name &&
      actualValue.cedula == newValue.cedula &&
      actualValue.city == newValue.city &&
      actualValue.address == newValue.address &&
      actualValue.phone_number == newValue.phone_number &&
      equalVehiclesIds(actualValue.vehicles_ids, newValue.vehicles_ids)
   );
}

export function equalVehiclesIds(actualValues, newValues) {
   if (actualValues.length !== newValues.length) return false;
   actualValues.forEach((value) => {
      const result = newValues.find((e) => e.number == value.number);
      if (!result) return false;
   });
   newValues.forEach((value) => {
      const result = actualValues.find((e) => e.number == value.number);
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
