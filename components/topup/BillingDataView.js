import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import InfoIcon from '../icons/InfoIcon';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import BasicInput from '../shared/BasicInput';
import LoadingButton from '../shared/LoadingButton';
import NextIcon from '../icons/NextIcon';
import VehiclesIdInput from './VehiclesIdInput';

export default function BillingDataView(props) {
  const [form, setForm] = React.useState({
    first_name: '',
    last_name: '',
    cedula: '',
    city: '',
    address: '',
    phone_number: '',
    vehicles_ids: [],
	});
	
	function next(){
		props.navigation.push('topupData')
	}

  return (
    <ScrollView keyboardShouldPersistTaps='never'>
      <View style={tailwind('px-5 py-4')}>
        <View
          style={tailwind('flex flex-row bg-orange-200 items-center rounded-md px-4 py-2')}
        >
          <InfoIcon fill={'#975a16'} />
          <Text style={[tailwind('text-yellow-800 text-xs ml-3'), typefaces.pr]}>
            Por favor verifica o completa tus datos de facturación
          </Text>
        </View>
      </View>
      <View style={tailwind('items-center')}>
        <BasicInput
          value={form.first_name}
          placeholder="Nombres"
          onEndEditing={(text) => {}}
          editable={false}
        />
        <BasicInput
          value={form.last_name}
          placeholder="Apellidos"
          onEndEditing={(text) => {}}
        />
        <BasicInput
          value={form.cedula}
          placeholder="Cedula o pasaporte"
          onEndEditing={(text) => {}}
        />
        <BasicInput value={form.city} placeholder="Ciudad" onEndEditing={(text) => {}} />
        <BasicInput
          value={form.address}
          placeholder="Direccion domiciliaria"
          onEndEditing={(text) => {}}
        />
        <BasicInput
          value={form.phone_number}
          placeholder="n° de telefono"
          onEndEditing={(text) => {}}
        />
        <VehiclesIdInput />
      </View>
      <View style={tailwind('flex flex-row justify-end pr-6 mt-12 mb-4')}>
        <LoadingButton
          icon={<NextIcon />}
          iconPos={'right'}
          text="continuar"
					style={tailwind('w-48')}
					onPress={next}
        />
      </View>
    </ScrollView>
  );
}
