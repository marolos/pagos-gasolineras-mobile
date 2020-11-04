import React from 'react';
import { View, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import ReactNativeModal from 'react-native-modal';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import EditIcon from '../icons/EditIcon';
import BasicInput from '../shared/BasicInput';
import Button from '../shared/Button';

export default class UserSelector extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         open: true,
         input: null,
         inputShow: null,
      };
   }

   press = () => {
      this.setState((state) => ({ open: !state.open }));
   };

   hide = () => {
      this.setState((state) => ({ open: false }));
   };

   accept = () => {
      this.setState(() => ({ open: false, inputShow: this.state.input }));
      if (this.props.onChange) {
         this.props.onChange(this.state.input);
      }
   };

   onChange = (input) => {
      this.setState(() => ({ input }));
   };

   render() {
      const { inputShow } = this.state;
      return (
         <View>
            <Ripple onPress={this.press} style={styles.ripple}>
               <Text style={[typefaces.pr]}>{inputShow ? inputShow : 'Ingresar'}</Text>
               <EditIcon />
            </Ripple>
            <ReactNativeModal isVisible={this.state.open}>
               <View style={tailwind('bg-white p-6 rounded-lg')}>
                  <Text style={[tailwind('mb-4 ml-2'), typefaces.pm]}>Ingresar usuario</Text>
                  <BasicInput placeholder="Identificador o correo" onChange={this.onChange} />
                  <View style={tailwind('flex flex-row justify-between mt-6')}>
                     <Button text="cancelar" onPress={this.hide} primary={false} />
                     <Button text="aceptar" onPress={this.accept} />
                  </View>
               </View>
            </ReactNativeModal>
         </View>
      );
   }
}

const styles = {
   ripple: [
      tailwind(
         'flex flex-row items-center justify-between px-4 py-2 border border-gray-400 rounded',
      ),
      { minWidth: 130 },
   ],
};
