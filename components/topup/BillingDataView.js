import React from 'react';
import {
   View,
   Text,
   ScrollView,
   ActivityIndicator,
   FlatList,
   Keyboard,
} from 'react-native';
import InfoIcon from '../icons/InfoIcon';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import BasicInput from '../shared/BasicInput';
import LoadingButton from '../shared/LoadingButton';
import NextIcon from '../icons/NextIcon';
import VehiclesIdInput from './VehiclesIdInput';
import { FULL_WIDTH, FULL_HIGHT, CEDULA_REGEX, CHAR_REGEX } from '../utils/constants';
import { makeCancelable, equalForm, validForm } from '../utils/utils';
import SimpleToast from 'react-native-simple-toast';
import CitySelect from './CitySelect';
import Fetch from '../utils/Fetch';

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
         Fetch.get('/users/billing/data/'),
         (res) => {
            this.setState({ actualData: res.body, form: res.body, loadingData: false });
         },
         (err) => {
            if (err.isCanceled) return;
            this.setState({ loadingData: false });
         },
      );
   }

   componentWillUnmount() {
      if (this.request) this.request.cancel();
      if (this.saveRequest) this.saveRequest.cancel();
   }

   sendData = () => {
      Keyboard.dismiss();
      if (this.state.loading) return;
      const { navigation, route } = this.props;
		const { actualData, form } = this.state;

      const { valid, message } = validForm(form);
      if (!valid) {
         SimpleToast.show(message);
         return;
      }
      if (equalForm(actualData, form)) {
         navigation.push('topupData', route.params);
         return;
      }
      this.setState({ loading: true });

      this.saveRequest = makeCancelable(
         Fetch.put('/users/billing/data/', this.state.form),
         (res) => {
            this.setState({ loading: false, actualData: this.state.form }, () => {
               navigation.push('topupData', route.params);
            });
         },
         (err) => {
            if (err.isCanceled) return;
            if (err.status === 455) {
               SimpleToast.show('Ya existe otro registro con la placa: ' + err.body.error);
               this.setState({
                  loading: false,
               });
               return;
            }
            this.setState({
               loading: false,
               actualData: this.state.actualData,
               form: this.state.actualData,
            });
         },
      );
   };

   render() {
      const formData = this.state.form;
      return (
         <ScrollView keyboardShouldPersistTaps="handled">
            <FlatList />
            <View style={tailwind('px-5 py-4')}>
               <Message />
            </View>
            <View style={tailwind('items-center')}>
               <View style={styles.input.container}>
                  <Text style={styles.input.text}>Nombres:</Text>
                  <BasicInput
                     defaultValue={formData.first_name}
                     placeholder="Nombres"
                     validate={(text) => text.length > 0}
                     onChange={(text) =>
                        this.setState(({ form }) => ({ form: { ...form, first_name: text } }))
                     }
                  />
               </View>
               <View style={styles.input.container}>
                  <Text style={styles.input.text}>Apellidos:</Text>
                  <BasicInput
                     defaultValue={formData.last_name}
                     placeholder="Apellidos"
                     validate={(text) => text.length > 0}
                     onChange={(text) =>
                        this.setState(({ form }) => ({ form: { ...form, last_name: text } }))
                     }
                  />
               </View>
               <View style={styles.input.container}>
                  <Text style={styles.input.text}>N° de documento:</Text>
                  <BasicInput
                     defaultValue={formData.cedula}
                     placeholder="Cédula o pasaporte"
                     maxLength={10}
                     keyboardType="numeric"
                     validate={(text) =>
                        text.length > 0 && !CHAR_REGEX.test(text) && CEDULA_REGEX.test(text)
                     }
                     onChange={(text) =>
                        this.setState(({ form }) => ({ form: { ...form, cedula: text } }))
                     }
                  />
               </View>
               <View style={styles.input.container}>
                  <Text style={styles.input.text}>Ciudad:</Text>
                  <CitySelect
                     defaultValue={formData.city}
                     onChange={(text) =>
                        this.setState(({ form }) => ({ form: { ...form, city: text } }))
                     }
                  />
               </View>
               <View style={styles.input.container}>
                  <Text style={styles.input.text}>Direccion:</Text>
                  <BasicInput
                     defaultValue={formData.address}
                     placeholder="Direccion domiciliaria"
                     validate={(text) => text.length > 0}
                     onChange={(text) =>
                        this.setState(({ form }) => ({ form: { ...form, address: text } }))
                     }
                  />
               </View>
               <View style={styles.input.container}>
                  <Text style={styles.input.text}>Telefono:</Text>
                  <BasicInput
                     defaultValue={formData.phone_number}
                     placeholder="n° de teléfono"
                     validate={(text) => text.length > 0 && !CHAR_REGEX.test(text)}
                     maxLength={10}
                     keyboardType="numeric"
                     onChange={(text) =>
                        this.setState(({ form }) => ({
                           form: { ...form, phone_number: text },
                        }))
                     }
                  />
               </View>
               <VehiclesIdInput
                  defaultValue={formData.vehicles_ids}
                  loading={this.state.loadingData}
                  onChange={(items) =>
                     this.setState(({ form }) => ({ form: { ...form, vehicles_ids: items } }))
                  }
               />
            </View>
            <View style={styles.button.container}>
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
      <View style={styles.message.view}>
         <InfoIcon fill={'#975a16'} />
         <Text style={styles.message.text}>
            Por favor verifica o completa tus datos de facturación
         </Text>
      </View>
   );
}

function Spinner() {
   return (
      <View style={styles.spiner.view}>
         <ActivityIndicator
            animating={true}
            color="black"
            size="large"
            style={tailwind('p-0 m-0')}
         />
      </View>
   );
}

const styles = {
   spiner: {
      view: [
         tailwind('absolute bg-gray-800 bg-opacity-50 flex justify-center'),
         { width: FULL_WIDTH, height: FULL_HIGHT },
      ],
   },
   message: {
      view: tailwind('flex flex-row bg-orange-200 items-center rounded-md px-4 py-2'),
      text: [tailwind('text-yellow-800 text-xs ml-3'), typefaces.pr],
	},
	input: {
		container: tailwind('w-64 my-2'),
		text: [tailwind('ml-2 text-sm'), typefaces.pr],
	},
	button: {
		container: tailwind('flex flex-row justify-end pr-6 mt-12 mb-4'),
	},
}

export default BillingDataView;
