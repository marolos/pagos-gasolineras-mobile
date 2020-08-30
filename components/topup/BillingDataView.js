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
import { makeCancelable, equalForm } from '../../utils/utils';

class BillingDataView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         actualData: {},
         loading: false,
         loadingData: true,
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
   }

   componentDidMount() {
      this.request = makeCancelable(
         FetchClient.get('/users/billing/data/'),
         (data) => this.setState({ actualData: data, form: data, loadingData: false }),
         (err) => this.setState({ loadingData: false }),
      );
   }

   componentWillUnmount() {
      this.request.cancel();
   }

   sendData = () => {
      const { navigation, route } = this.props;
      const { actualData, form } = this.state;
      if (equalForm(actualData, form)) {
         navigation.push('topupData', route.params);
         return;
      }
      this.setState({ actualData: this.state.form, loading: true });
      FetchClient.put('/users/billing/data/', this.state.form)
         .then((data) => {
            this.setState({ loading: false }, () => {
               navigation.push('topupData', route.params);
            });
         })
         .catch((err) => console.log(err));
   };

   render() {
      const { form } = this.state;
      return (
         <ScrollView keyboardShouldPersistTaps="never">
            <View style={tailwind('px-5 py-4')}>
               <Message />
            </View>
            <View style={tailwind('items-center')}>
               <View style={tailwind('w-64 my-2')}>
                  <Text style={[tailwind('ml-2 text-sm'), typefaces.pr]}>Nombres:</Text>
                  <BasicInput
                     defaultValue={form.first_name}
                     placeholder="Nombres"
                     validate={(text) => text.length > 0}
                     onEndEditing={(text) =>
                        this.setState(({ form }) => ({ form: { ...form, first_name: text } }))
                     }
                  />
               </View>
               <View style={tailwind('w-64 my-2')}>
                  <Text style={[tailwind('ml-2 text-sm'), typefaces.pr]}>Apellidos:</Text>
                  <BasicInput
                     defaultValue={form.last_name}
                     placeholder="Apellidos"
                     validate={(text) => text.length > 0}
                     onEndEditing={(text) =>
                        this.setState(({ form }) => ({ form: { ...form, last_name: text } }))
                     }
                  />
               </View>
               <View style={tailwind('w-64 my-2')}>
                  <Text style={[tailwind('ml-2 text-sm'), typefaces.pr]}>Identificacion:</Text>
                  <BasicInput
                     defaultValue={form.cedula}
                     placeholder="Cedula o pasaporte"
                     validate={(text) => text.length > 0}
                     onEndEditing={(text) =>
                        this.setState(({ form }) => ({ form: { ...form, cedula: text } }))
                     }
                  />
               </View>
               <View style={tailwind('w-64 my-2')}>
                  <Text style={[tailwind('ml-2 text-sm'), typefaces.pr]}>Ciudad:</Text>
                  <BasicInput
                     defaultValue={form.city}
                     placeholder="Ciudad"
                     validate={(text) => text.length > 0}
                     onEndEditing={(text) =>
                        this.setState(({ form }) => ({ form: { ...form, city: text } }))
                     }
                  />
               </View>
               <View style={tailwind('w-64 my-2')}>
                  <Text style={[tailwind('ml-2 text-sm'), typefaces.pr]}>Direccion:</Text>
                  <BasicInput
                     defaultValue={form.address}
                     placeholder="Direccion domiciliaria"
                     validate={(text) => text.length > 0}
                     onEndEditing={(text) =>
                        this.setState(({ form }) => ({ form: { ...form, address: text } }))
                     }
                  />
               </View>
               <View style={tailwind('w-64 my-2')}>
                  <Text style={[tailwind('ml-2 text-sm'), typefaces.pr]}>Telefono:</Text>
                  <BasicInput
                     defaultValue={form.phone_number}
                     placeholder="n° de telefono"
                     validate={(text) => text.length > 0}
                     onEndEditing={(text) =>
                        this.setState(({ form }) => ({
                           form: { ...form, phone_number: text },
                        }))
                     }
                  />
               </View>
               <VehiclesIdInput
                  items={form.vehicles_ids}
                  loading={this.state.loadingData}
                  onChange={(items) =>
                     this.setState(({ form }) => ({ form: { ...form, vehicles_ids: items } }))
                  }
               />
            </View>
            <View style={tailwind('flex flex-row justify-end pr-6 mt-12 mb-4')}>
               <LoadingButton
                  icon={<NextIcon />}
                  iconPos={'right'}
                  text="continuar"
                  style={tailwind('w-48')}
                  onPress={this.sendData}
                  loading={this.state.loading}
               />
            </View>
            {this.state.loadingData && <Spinner />}
         </ScrollView>
      );
   }
}

function Message() {
   return (
      <View style={tailwind('flex flex-row bg-orange-200 items-center rounded-md px-4 py-2')}>
         <InfoIcon fill={'#975a16'} />
         <Text style={[tailwind('text-yellow-800 text-xs ml-3'), typefaces.pr]}>
            Por favor verifica o completa tus datos de facturación
         </Text>
      </View>
   );
}

function Spinner() {
   return (
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
   );
}

export default BillingDataView;
