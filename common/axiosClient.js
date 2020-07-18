import Axios from 'axios';
import { REST_API_URL } from './constants';

const AxiosClient = Axios.create({
  baseURL: REST_API_URL,
});

AxiosClient.setAuthToken = (token)=> {
  AxiosClient.defaults.headers['Authorization'] = `Bearer ${token}`;
}

AxiosClient.addHeader = (header, value)=> {
  AxiosClient.defaults.headers[header] = value;
}


export default AxiosClient;
