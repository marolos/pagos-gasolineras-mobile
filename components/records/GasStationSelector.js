import React, { memo } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import Fetch from '../utils/Fetch';
import { shadowStyle, typefaces } from '../utils/styles';
import { makeCancelable } from '../utils/utils';
import AnimatedArrowIcon from '../icons/AnimatedArrowIcon';
import Modal from 'react-native-modal';

export default class GasStationSelector extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         selected: null,
         options: [],
         loading: false,
			open: false, 
			company: null
      }
   }

   loadData(company, selected){
      if(company){
         this.setState({ loading: true, company: company });
         this.cancelControl = makeCancelable(   
            Fetch.get('/company/stations/'+company.id+"/"),
            (res) => {
               this.props.onChange(selected);
               this.setState({ options: res.body, loading: false, selected: selected });
            },
            (err) => {
               if (!err.isCanceled) this.setState({ loading: false, selected: null });
            }); 
      }else {
         this.setState({ options: [], selected: null });
      } 
   }

   componentWillUnmount() {
      if (this.cancelControl) this.cancelControl.cancel();
   }
   
   render(){
      return (
         <View style={tailwind('flex flex-row justify-between mt-3 items-center')}>
            <Text style={typefaces.pm}>Estación: </Text>
            <Ripple
               style={tailwind(
                  'flex flex-row items-center justify-between w-48 px-4 py-1 border border-gray-400 rounded',
               )}
               onPress={() => this.setState({ open: !this.state.open })}
            >
               {this.state.loading ? (
                  <ActivityIndicator size="small" animating color="black" style={tailwind('mb-1')} />
               ) : (
                  <Text style={[tailwind('text-sm ml-1 mr-2'), typefaces.pr]}>
                     {this.state.selected ? this.state.selected.name : 'seleccionar'}
                  </Text>
               )}
               <AnimatedArrowIcon change={this.state.open} />
            </Ripple>
            {this.state.open && !this.state.loading && this.state.options.length > 0 ?
               <GasStationOptions
                     show={this.state.open}
                     onCancel={()=> {
                        this.setState({ open: false });
                     }}
                     options={this.state.options}
                     onConfirm={(item)=>{
								item["company"] = this.state.company;
                        this.setState({ selected: item, open: false });
                        this.props.onChange(this.state.selected);
                     }}
               />
            : <View/>}
         </View>
      );
   }

}


const GasStationOptions = memo(({ show, onCancel, onConfirm, options }) => {
	return (
		<Modal
			isVisible={show}
			animationIn="fadeIn"
			animationOut="fadeOut"
         backdropTransitionOutTiming={0}
         onBackdropPress={onCancel}
			style={tailwind('flex items-center')}
		>
			<ScrollView style={styles.list}>
            {options.map((item) => (
               <Ripple
                  key={item.id}
                  style={tailwind('px-4 py-3')}
                  onPress={() => {
                     onConfirm(item);
                  }}
               >
                  <Text>
                     {item.name}
                  </Text>
               </Ripple>
            ))}
         </ScrollView>
		</Modal>
	);
});

const styles = {
   list: [
      tailwind('absolute bg-white w-48 border rounded-sm border-white'),
      shadowStyle,
   ],
};
