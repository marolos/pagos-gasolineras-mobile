import { Dimensions } from "react-native";

export const REST_API_URL = 'http://localhost:8000';
export const ENCRYPTOR_KEY = 'MIIEowIBAAKA2LCcVqUelTOc6TwslUAm8vxnoCAQEt3hhlv8FjvjmZGqJ';

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
export const FULL_HIGHT = Dimensions.get('window').height
export const ADS_MAX_HEIGHT = 200


export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/