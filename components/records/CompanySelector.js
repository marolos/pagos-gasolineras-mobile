import React from 'react';
import { ActivityIndicator, View, Text, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import Fetch from '../utils/Fetch';
import { shadowStyle, typefaces } from '../utils/styles';
import { makeCancelable } from '../utils/utils';
import AnimatedArrowIcon from '../icons/AnimatedArrowIcon';

export default class CompanySelector extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         open: false,
         options: [],
         selected: this.props.selected,
         loading: false
      }
   }

   componentDidMount(){
      this.setState({ loading: true });
      this.cancelControl = makeCancelable(   
         Fetch.get('/company/all/'),
         (res) => {
            this.setState({ options: res.body, loading: false });
         },
         (err) => {
            if (!err.isCanceled) this.setState({ loading: false });
      });
   }

   componentWillUnmount() {
      if (this.cancelControl) this.cancelControl.cancel();
   }

   render() {
      return (
         <View style={tailwind('flex flex-row justify-between mt-4 items-center')}>
            <Text style={typefaces.pm}>Empresa: </Text>
            <Ripple style={styles.ripple} onPress={() => this.setState({ open: !this.state.open })}>
               {this.state.loading ? (
                  <ActivityIndicator size="small" animating color="black" style={tailwind('mb-1')} />
               ) : (
                  <View style={tailwind('flex flex-row')}>
                     {this.state.selected && (
                        <FastImage
                           source={{ uri: this.state.selected.company_logo_path }}
                           style={{ width: 20, height: 20 }}
                        />
                     )}
                     <Text style={[tailwind('text-sm ml-1 mr-2'), typefaces.pr]}>
                        {this.state.selected ? this.state.selected.business_name : 'seleccionar'}
                     </Text>
                  </View>
               )}
               <AnimatedArrowIcon change={this.state.open} />
            </Ripple>
            {this.state.open && !this.state.loading && (
               <ScrollView style={styles.list}>
                  {this.state.options.map((item) => (
                     <Ripple
                        key={item.id}
                        style={tailwind('px-3 py-3')}
                        onPress={() => {;
                           this.setState({ selected: item, open: false });
                           this.props.onChange(this.state.selected);
                        }}
                     >
                        <Item item={item} />
                     </Ripple>
                  ))}
               </ScrollView>
            )}
         </View>
      );
   }
}


function Item({ item }) {
   return (
      <View style={tailwind('flex flex-row justify-between')}>
         <View style={tailwind('flex flex-row')}>
            <FastImage
               source={{ uri: item.company_logo_path }}
               style={{ width: 20, height: 20 }}
            />
            <Text style={tailwind('ml-2')}>{item.business_name}</Text>
         </View>
      </View>
   );
}

const styles = {
   ripple: [
      tailwind(
         'flex flex-row items-center justify-between px-4 w-48 py-1 border border-gray-400 rounded',
      ),
      { minWidth: 130 },
   ],
   list: [
      tailwind('absolute bg-white w-48 border rounded-sm border-white'),
      { top: 41, right: 0, zIndex: 10 },
      shadowStyle
   ],
};
