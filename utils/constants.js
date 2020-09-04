import { Dimensions } from 'react-native';

export const REST_API_URL = 'https://fuelpay.azurewebsites.net';
//export const REST_API_URL = 'http://localhost:8000';
export const ENCRYPTOR_KEY = 'MIIEowIBAAKA2LCcVqUelTOc6TwslUAm8vxnoCAQEt3hhlv8FjvjmZGqJ';
console.log('::url::', REST_API_URL);
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
