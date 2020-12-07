import { createStore, applyMiddleware } from 'redux';
import rootReducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENCRYPTOR_KEY } from '../utils/constants';
import thunk from 'redux-thunk';
import { encryptTransform } from 'redux-persist-transform-encrypt/lib/sync';

const encryptor = encryptTransform({
	secretKey: ENCRYPTOR_KEY,
	onError: (error) => console.error('error on encryptor: ', error),
});

const reducers = persistReducer(
	{
		key: 'root',
		storage: AsyncStorage,
		whitelist: ['user', 'notifications', 'newNotification', 'userLocation', 'tips', 'ads'],
		transforms: [encryptor],
	},
	rootReducers,
);

const store = createStore(reducers, applyMiddleware(thunk));
const persistor = persistStore(store);

export const getPersistor = () => persistor;
export const getStore = () => store;
export const getState = () => store.getState();
