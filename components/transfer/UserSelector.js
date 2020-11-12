import React from 'react';
import { View, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import ReactNativeModal from 'react-native-modal';
import tailwind from 'tailwind-rn';
import { shadowStyle, typefaces } from '../utils/styles';
import EditIcon from '../icons/EditIcon';
import BasicInput from '../shared/BasicInput';
import Button from '../shared/Button';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Fetch from '../utils/Fetch';
import { ScrollView } from 'react-native-gesture-handler';

export default class UserSelector extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         open: false,
         input: null,
         inputShow: null,
         showResults: false,
         results: [],
      };
      this.searchDebounced = AwesomeDebouncePromise(
         (text) => Fetch.get('/users/search/?text=' + text),
         330,
      );
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
      this.setState(() => ({ input, showResults: !!input }));
      if (!input) return;
      if (input.length < 4) return;

      this.searchDebounced(input)
         .then((res) => {
            this.setState({ results: res.body.results });
         })
         .catch((err) => {
            err;
            this.setState({ showResults: false });
         });
   };

   onUserPress = (user) => {
      this.setState(() => ({ input: user.email, showResults: false }));
   };

   render() {
      const { inputShow, input, showResults, open, results } = this.state;
      return (
         <View>
            <Ripple onPress={this.press} style={styles.ripple}>
               <Text style={styles.rippleText}>{inputShow ? inputShow : 'Ingresar'}</Text>
               <EditIcon />
            </Ripple>
            <ReactNativeModal isVisible={open}>
               <View style={styles.modal.view}>
                  <View style={tailwind('flex flex-row mb-2')}>
                     <EditIcon />
                     <Text style={styles.modal.text}>Ingresar usuario</Text>
                  </View>
                  <View>
                     <BasicInput
                        placeholder="buscar por nombres o correo"
                        onChange={this.onChange}
                        defaultValue={input}
                     />
                     {showResults && results.length > 0 && (
                        <View style={styles.list}>
                           <ScrollView
                              keyboardShouldPersistTaps="handled"
                              style={{ maxHeight: 150 }}
                           >
                              {results.map((user, index) => (
                                 <Ripple
                                    key={user.id}
                                    style={styles.itemRipple}
                                    onPress={() => this.onUserPress(user)}
                                 >
                                    <Text>
                                       {user.first_name} {user.last_name}
                                    </Text>
                                    <Text style={tailwind('text-gray-600')}>{user.email}</Text>
                                 </Ripple>
                              ))}
                           </ScrollView>
                        </View>
                     )}
                  </View>
                  <View style={styles.button.view}>
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
   rippleText: [tailwind('mr-2'), typefaces.pr],
   modal: {
      view: tailwind('bg-white p-6 rounded-lg'),
      text: [tailwind('ml-2'), typefaces.pm],
   },
   button: {
      view: tailwind('flex flex-row justify-between mt-16 mb-8'),
   },
   list: [
      tailwind('absolute bg-white w-64 border rounded-sm border-white'),
      { position: 'absolute', top: 55, left: 10, zIndex: 12 },
      shadowStyle,
   ],
   itemRipple: tailwind('px-2 py-1'),
   scroll: {},
};
