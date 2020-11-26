import React, { memo } from 'react';
import { View, Text } from 'react-native';
import RadioGroup from '../shared/RadioGroup';
import Button from '../shared/Button';
import tailwind from 'tailwind-rn';
import Modal from 'react-native-modal';
import { typefaces } from '../utils/styles';
import CompanySelector from './CompanySelector';
import GasStationSelector from './GasStationSelector';
import SimpleToast from 'react-native-simple-toast';
import DateTimeFilter from './DateTimeFilter';

function CollapseModalFilters({ 
	visible, 
	closeCollapse, 
	onFilter, 
	onCancel,
	initFromDateTime,
	initToDateTime,
	initGasStation
 }) {
   const [state, setState] = React.useState({
      fromDatetime: null,
      toDatetime: null,
      gasStation: null,
      errorMsg: null
   });


   const onValidInput = (fromDatetime, toDatetime, gasStation) => {
		setState({ errorMsg: null, fromDatetime: fromDatetime, 
			toDatetime: toDatetime, gasStation: gasStation });
   }

   const onInvalidInput = (msg) => {
      setState({ errorMsg: msg, fromDatetime: null, toDatetime: null, gasStation: null })
   }

   const onValidate = ()=> {
      if(state.errorMsg)
         SimpleToast.show(state.errorMsg);
      else if(state.fromDatetime && state.toDatetime){
         onFilter(state.fromDatetime, state.toDatetime, null);
      }else if(state.gasStation){
         onFilter(null, null, state.gasStation);
      }else{
         SimpleToast.show("No ha seleccionado ningún filtro.");
      }
      
   }

   return (
      <Modal
         isVisible={visible}
         testID={'modal'}
         animationIn="fadeInUp"
         animationOut="fadeOutDown"
         onSwipeComplete={closeCollapse}
         onBackdropPress={closeCollapse}
         backdropTransitionOutTiming={0}
         style={styles.modal}
      >
         <View style={styles.view}>
            <View style={tailwind('my-3 mx-2')}>
					<ExpandedFilter 
						initFromDateTime={initFromDateTime}
						initToDateTime={initToDateTime}
						initGasStation={initGasStation}
                  onInvalidInput={(msg) => onInvalidInput(msg)}
                  onValidInput={(fdt, tdt, g) => onValidInput(fdt, tdt, g)}/>
            </View>
            <View style={tailwind('flex flex-row justify-center')}>
						<Button text={'cancelar'} primary={false} onPress={onCancel} style={{ width: 100 }} />
                  <View style={tailwind('m-1')}></View>
						<Button text={'Filtrar'} onPress={onValidate} style={{ width: 100 }} />
					</View>
         </View>
      </Modal>
   );
}

const styles = {
   modal: tailwind('w-full flex justify-end items-center m-0'),
   view: tailwind('w-full h-64 bg-white rounded-t-lg'),
   title: tailwind('flex flex-row items-center'),
   titleText: [tailwind('mt-2 ml-2 text-base'), typefaces.psb],
   image: { width: 50, height: 50 },
   total: tailwind('flex flex-row p-4'),
   totalText: [tailwind('text-base'), typefaces.pm],
   totalValue: [tailwind('text-lg text-green-600 ml-4'), typefaces.pm],
   options: tailwind('flex flex-row justify-evenly mt-6'),
};

function ExpandedFilter({
	onValidInput, 
	onInvalidInput,
	initFromDateTime,
	initToDateTime,
	initGasStation
}){
   
   const [state, setState] = React.useState({
      value: initFromDateTime && initToDateTime ? "datetime" : initGasStation ? "gas_station": "datetime"
   });
   

   const onCheck = (value) => {
      onValidInput(initFromDateTime, initToDateTime, initGasStation);
      setState({ value: value });
   };
   
   return (
      <View style={[tailwind('flex'), { minHeight: 20 }]}>
         <View >
            <View style={tailwind('flex items-center m-2')}>
            <Text style={[tailwind('mb-2 text-lg'), typefaces.pb]} >Filtros</Text>  
               <RadioGroup
                  initValue={state.value}
                  onCheck={onCheck}
                  radios={[
                     {label: "Fecha y hora", value: "datetime"},
                     {label: "Estación", value: "gas_station"}
                  ]}
               />
               <View>
                  {
                     state.value == "datetime" ?
                     <DateTimeFilter 
                        fromDatetime={initFromDateTime} 
                        toDatetime={initToDateTime}
                        onInvalidInput={(msg) => onInvalidInput(msg)}
                        onValidInput={(fdt, tdt) => onValidInput(fdt, tdt, null)}
                        onClear={()=> {}}
                        /> : 
							<GasFilter 
								initGasStation={initGasStation}
                        onValidInput={(gas)=> onValidInput(null, null, gas)}
                        onInvalidInput={(msg) => onInvalidInput(msg)}/>
                  }
               </View>
            </View>
         </View>
         
      </View>
   );
}


function GasFilter({
	initGasStation,
	onInvalidInput, 
	onValidInput}){

   const ref = React.useRef();

   const loadGasStations = (company) => {
      if(company != null){
         ref.current.loadData(company, null);
      }
	}
	
	React.useEffect(()=>{
		if(initGasStation){
			ref.current.loadData(initGasStation.company, initGasStation);
		}
	}, []);
	

   return (
      <View>
         <CompanySelector selected={initGasStation?.company} onChange={(item) => {
               loadGasStations(item);
            }
         }></CompanySelector>
         <GasStationSelector ref={ref} onChange={(gas)=> {
             if(gas != null){
               onValidInput(gas);
             }else {
                onInvalidInput("No ha seleccionado una estación.");
             }
         }}></GasStationSelector>
      </View>
   );
}


export default memo(CollapseModalFilters);
