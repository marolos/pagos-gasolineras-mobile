import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import InfoIcon from '../icons/InfoIcon';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import BasicInput from '../shared/BasicInput';
import LoadingButton from '../shared/LoadingButton';
import NextIcon from '../icons/NextIcon';
import VehiclesIdInput from './VehiclesIdInput';
import FetchClient from '../../utils/FetchClient';
import { FULL_WIDTH, FULL_HIGHT } from '../../utils/constants';
import { makeCancelable } from '../../utils/utils';

export default function BillingDataView({ route, navigation }) {
	const [state, dispatch] = React.useReducer(reducer, initialState);

   React.useEffect(() => {
      const request = makeCancelable(
         FetchClient.get('/users/billing/data/'),
         (data) => {
            actualData = data;
            dispatch({
               type: 'form',
               value: data,
            });
            dispatch({ type: 'end_loading_data' });
         },
         (err) => {},
      );
      return function cleanup() {
         request.cancel();
      };
   }, []);

   function next() {
      if (state.callsToForm < 1) {
         navigation.push('topupData', route.params);
         return;
      }
      actualData = state.form;
      dispatch({ type: 'loading' });
      FetchClient.put('/users/billing/data/', state.form)
         .then((data) => {
            navigation.push('topupData', route.params);
         })
         .catch((err) => console.log(err))
         .finally(() => dispatch({ type: 'end_loading' }));
   }

   return (
      <ScrollView keyboardShouldPersistTaps="never">
         <View style={tailwind('px-5 py-4')}>
            <View
               style={tailwind(
                  'flex flex-row bg-orange-200 items-center rounded-md px-4 py-2',
               )}
            >
               <InfoIcon fill={'#975a16'} />
               <Text style={[tailwind('text-yellow-800 text-xs ml-3'), typefaces.pr]}>
                  Por favor verifica o completa tus datos de facturación
               </Text>
            </View>
         </View>
         <View style={tailwind('items-center')}>
            <View style={tailwind('w-64 my-2')}>
               <Text style={[tailwind('ml-2 text-sm'), typefaces.pr]}>Nombres:</Text>
               <BasicInput
                  defaultValue={state.form.first_name}
                  placeholder="Nombres"
                  validate={(text) => text.length > 0}
                  onEndEditing={(text) =>
                     dispatch({
                        type: 'form',
                        value: { ...state.form, first_name: text },
                     })
                  }
               />
            </View>
            <View style={tailwind('w-64 my-2')}>
               <Text style={[tailwind('ml-2 text-sm'), typefaces.pr]}>Apellidos:</Text>
               <BasicInput
                  defaultValue={state.form.last_name}
                  placeholder="Apellidos"
                  validate={(text) => text.length > 0}
                  onEndEditing={(text) =>
                     dispatch({
                        type: 'form',
                        value: { ...state.form, last_name: text },
                     })
                  }
               />
            </View>
            <View style={tailwind('w-64 my-2')}>
               <Text style={[tailwind('ml-2 text-sm'), typefaces.pr]}>Identificacion:</Text>
               <BasicInput
                  defaultValue={state.form.cedula}
                  placeholder="Cedula o pasaporte"
                  validate={(text) => text.length > 0}
                  onEndEditing={(text) =>
                     dispatch({
                        type: 'form',
                        value: { ...state.form, cedula: text },
                     })
                  }
               />
            </View>
            <View style={tailwind('w-64 my-2')}>
               <Text style={[tailwind('ml-2 text-sm'), typefaces.pr]}>Ciudad:</Text>
               <BasicInput
                  defaultValue={state.form.city}
                  placeholder="Ciudad"
                  validate={(text) => text.length > 0}
                  onEndEditing={(text) =>
                     dispatch({ type: 'form', value: { ...state.form, city: text } })
                  }
               />
            </View>
            <View style={tailwind('w-64 my-2')}>
               <Text style={[tailwind('ml-2 text-sm'), typefaces.pr]}>Direccion:</Text>
               <BasicInput
                  defaultValue={state.form.address}
                  placeholder="Direccion domiciliaria"
                  validate={(text) => text.length > 0}
                  onEndEditing={(text) =>
                     dispatch({
                        type: 'form',
                        value: { ...state.form, address: text },
                     })
                  }
               />
            </View>
            <View style={tailwind('w-64 my-2')}>
               <Text style={[tailwind('ml-2 text-sm'), typefaces.pr]}>Telefono:</Text>
               <BasicInput
                  defaultValue={state.form.phone_number}
                  placeholder="n° de telefono"
                  validate={(text) => text.length > 0}
                  onEndEditing={(text) =>
                     dispatch({
                        type: 'form',
                        value: { ...state.form, phone_number: text },
                     })
                  }
               />
            </View>
            <VehiclesIdInput
               items={state.form.vehicles_ids}
               loading={state.loadingData}
               onChange={(items) =>
                  dispatch({
                     type: 'form',
                     value: { ...state.form, vehicles_ids: items },
                  })
               }
            />
         </View>
         <View style={tailwind('flex flex-row justify-end pr-6 mt-12 mb-4')}>
            <LoadingButton
               icon={<NextIcon />}
               iconPos={'right'}
               text="continuar"
               style={tailwind('w-48')}
               onPress={next}
               loading={state.loading}
            />
         </View>
         {state.loadingData && (
            <View
               style={[
                  tailwind('absolute bg-gray-800 bg-opacity-50 flex justify-center'),
                  { width: FULL_WIDTH, height: FULL_HIGHT },
               ]}
            >
               <ActivityIndicator
                  animating={true}
                  color="black"
                  size="large"
                  style={tailwind('p-0 m-0')}
               />
            </View>
         )}
      </ScrollView>
   );
}

const initialState = {
   loading: false,
   loadingData: true,
   callsToForm: 0,
   form: {
      first_name: '',
      last_name: '',
      cedula: '',
      city: '',
      address: '',
      phone_number: '',
      vehicles_ids: [],
   },
};

let actualData = {};

const reducer = (state, action) => {
   switch (action.type) {
      case 'loading':
         return { ...state, loading: true };
      case 'end_loading':
         return { ...state, loading: false };
      case 'loading_data':
         return { ...state, loadingData: true };
      case 'end_loading_data':
         return { ...state, loadingData: false };
      case 'form':
         return {
            ...state,
            form: action.value,
            callsToForm: equal(actualData, action.value) ? 0 : state.callsToForm + 1,
         };
      default:
         return state;
   }
};

const equal = (actualValue, newValue) => {
   return (
      actualValue.first_name == newValue.first_name &&
      actualValue.last_name == newValue.last_name &&
      actualValue.cedula == newValue.cedula &&
      actualValue.city == newValue.city &&
      actualValue.address == newValue.address &&
      actualValue.phone_number == newValue.phone_number &&
      equalVehiclesIds(actualValue.vehicles_ids, newValue.vehicles_ids)
   );
};

const equalVehiclesIds = (actualValues, newValues) => {
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
};
