import { createStore, applyMiddleware } from 'redux';
import rootReducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createEncryptor from 'redux-persist-transform-encrypt';
import { ENCRYPTOR_KEY } from '../utils/constants';
import thunk from 'redux-thunk';

const encryptor = createEncryptor({
   secretKey: ENCRYPTOR_KEY,
   onError: (error) => console.error('error on encryptor: ', error),
});

const reducers = persistReducer(
   {
      key: 'root',
      storage: AsyncStorage,
      whitelist: ['user'],
      transforms: [encryptor],
   },
   rootReducers,
);

const store = createStore(reducers, applyMiddleware(thunk));
const persistor = persistStore(store);

export const getPersistor = () => persistor;
export const getStore = () => store;
export const getState = () => store.getState();
