import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import NextIcon from '../icons/NextIcon';
import tailwind from 'tailwind-rn';
import Line from '../shared/Line';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import { typefaces } from '../../utils/styles';
import AddSubInput from '../shared/AddSubInput';

export default function TopupDataView(props) {
  return (
    <View>
      <View style={tailwind('p-6')}>
        <Text style={[tailwind('text-base mb-2'), typefaces.pm]}>Facturacion:</Text>
        <View>
          <TouchableOpacity
            delayPressIn={0}
            activeOpacity={0.6}
            onPress={props.navigation.goBack}
          >
            <View
              style={tailwind(
                'border-2 rounded border-gray-400 flex flex-row justify-between px-6 py-4',
              )}
            >
              <Text style={[typefaces.pm]}>{'Manuela canizares'}</Text>
              <View style={tailwind('flex flex-row items-center')}>
                <Text style={[typefaces.pm, tailwind('mr-4 ')]}>editar</Text>
                <ArrowRightIcon />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Line style={tailwind('w-full bg-gray-300 my-2')} />
      <View style={tailwind('p-6')}>
        <View>
          <Text style={[tailwind('text-base'), typefaces.pm]}>Empresa:</Text>
        </View>
        <View>
          <Text style={[tailwind('text-base mb-2'), typefaces.pm]}>Cantidad en dolares:</Text>
          <AddSubInput />
        </View>
      </View>
      <View style={tailwind('p-6')}>
        <Resume />
      </View>
      <View style={tailwind('flex flex-row justify-end pr-6 mt-12 mb-4')}>
        <LoadingButton
          icon={<NextIcon />}
          iconPos={'right'}
          text="continuar"
          style={tailwind('w-48')}
        />
      </View>
    </View>
  );
}

function Resume(props) {
  return (
    <View>
      <View>
        <Text style={[tailwind('text-base'), typefaces.pm]}>Subtotal:</Text>
      </View>
      <View>
        <Text style={[tailwind('text-base'), typefaces.pm]}>IVA:</Text>
      </View>
      <View>
        <Text style={[tailwind('text-base'), typefaces.pm]}>Comision:</Text>
      </View>
      <View>
        <Text style={[tailwind('text-base'), typefaces.pm]}>Total a pagar:</Text>
      </View>
    </View>
  );
}
