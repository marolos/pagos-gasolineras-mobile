import React from 'react'
import { 
   View, 
   Text, 
   ActivityIndicator, 
   ScrollView, 
   RefreshControl, 
   Image,
   Platform,
   UIManager,
   LayoutAnimation,
   TouchableOpacity,
} from "react-native";
import RadioGroup from '../shared/RadioGroup'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Fetch from '../utils/Fetch';
import tailwind from 'tailwind-rn';
import { makeCancelable } from '../utils/utils';
import Ripple from 'react-native-material-ripple';
import ScheduleIcon from '../icons/ScheduleIcon';
import AnimatedArrowIcon from '../icons/AnimatedArrowIcon';
import InfoIcon from '../icons/InfoIcon';
import { typefaces } from '../utils/styles';
import { formatISODate } from '../buy/utils';
import ClockIcon from '../icons/ClockIcon';
import CalendarIcon from '../icons/CalendarIcon';
import CompanySelector from './CompanySelector';
import GasStationSelector from './GasStationSelector';


class RecordsView extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         page: 0,
         purchases: [],
         loading: true, 
         loadMore: false,  
         refreshing: false,
         filterExpanded: false
      }
      if(Platform.OS == 'android'){
         UIManager.setLayoutAnimationEnabledExperimental(true);
      }
   }

   componentDidMount(){
      this.cancelControl = makeCancelable(
         Fetch.get("/purchase/user/", { page: this.state.page }),
         (value) => {
            this.setState({ purchases: value.body, loading: false });
         },
         (err) => {
            if (err.isCanceled) return;
            this.setState({ purchases: [], loading: false });
         },
      );   
   }
   
   loadMoreData(){
      this.cancelControl = makeCancelable(
         Fetch.get("/purchase/user/", { page: this.state.page }),
         (value) => {
            let data = this.state.purchases;
            if(value.body.length > 0){
               data.push(value.body);
            }
            console.log(data);
            this.setState({ purchases: data, loadMore: false });
         },
         (err) => {
            if (err.isCanceled) return;
            this.setState({ purchases: this.state.purchases, loadMore: false });
         },
      );   
   }

   componentWillUnmount(){
      this.cancelControl.cancel();
   }

   onRefresh = () => {
      this.setState({ refreshing: true });
      this.cancelControl = makeCancelable(
         Fetch.get('/purchase/user/', { page: this.state.page }),
         (res) => {
            this.setState({ purchases: res.body, loading: false, refreshing: false });
         },
         (err) => {
            this.setState({ loading: false, refreshing: false });
            console.error(err);
         },
      );
   };

   onAction = () => {
      this.setState({ filterExpanded: !this.state.filterExpanded });
   }

   onFilter = (fromDate, toDate, gasStation) => {

   };

   onScroll = (evt) => {
      this.setState({loadMore: true, page: this.state.page+1});
      this.loadMoreData();
   }

   render(){
      return (
         <ScrollView
            onMomentumScrollEnd={this.onScroll}
            refreshControl={
               <RefreshControl onRefresh={this.onRefresh} refreshing={this.state.refreshing} />
            }>

            <View>
               <View style={tailwind('my-3 mx-2')}>
                  <ExpandedFilter 
                     expanded={this.state.filterExpanded} 
                     onAction={this.onAction}
                     onFilter={this.onFilter}/>
               </View>
            {this.state.loading ? 
                  <View style={[tailwind('flex flex-row justify-center'), { height: 200 }]}>
                     <ActivityIndicator animating color="black" size="large" />
                  </View>
               : this.state.purchases.length == 0 ? <EmptyMessage/> :
               <View>
                  <Text style={tailwind('mx-2')}>Resultados: </Text>
                  <PurchasesList 
                     data={this.state.purchases} 
                     onRefresh={this.onRefresh}
                     refreshing={this.state.refreshing}
                  />
                  {this.state.loadMore ? 
                  <View style={[tailwind('flex flex-row justify-center'), { height: 30 }]}>
                     <ActivityIndicator animating color="black" size="large" />
                  </View>
                  : <View></View>}
               </View>
               }
            </View>
         </ScrollView>
       );
   }
}

function PurchasesList({data, onItemTap}){
   return (
      <View>
      {
         data.map((item) => 
            <View key={'p'+item.id}>
               <PurchaseItem purchase={item}></PurchaseItem>
            </View>
         )
      }
      </View>
   );
   {/* <ScrollView 
         refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
         }>
         <FlatList 
            data={data}
            renderItem={({item}) => <PurchaseItem purchase={item}></PurchaseItem>}
         />
      </ScrollView > */}
}

function PurchaseItem({purchase}){
   return (
      <Ripple onPress={()=> {}} style={tailwind('mx-2 my-1')}>
         <View style={tailwind('flex rounded-md py-2 px-3 border border-gray-300')}>
            <View style={tailwind('flex flex-row')}> 
               <View style={tailwind('mt-1 mr-1')}>
                  <ScheduleIcon></ScheduleIcon>
               </View>
               <Text>
                  <Text style={[tailwind('font-semibold'), typefaces.pm]}>Compra </Text> 
                  en <Text style={[tailwind('font-semibold'), typefaces.pm]}>
                     {purchase?.gas_station?.name}</Text> por{' '}
                  <Text style={[tailwind('text-green-600'), typefaces.pm]}>
                     ${parseFloat(purchase?.amount).toFixed(2)}
                  </Text>
               </Text>
            </View>
            <View style={tailwind('flex flex-row justify-end')}>
               <Text style={[tailwind('text-gray-700 text-xs'), typefaces.pm]}>Factura</Text>
               <View style={tailwind('ml-1')}>
                  <InfoIcon width={14} height={14} fill={'#555'}></InfoIcon>
               </View>
               
            </View>
            <View style={tailwind('flex flex-row ml-4')}>
               <Text style={[tailwind('text-gray-700 text-xs'), typefaces.pm]}>
                  {formatISODate(purchase?.created_at ? purchase?.created_at : new Date())} </Text>
               <Text style={[tailwind('text-xs')]}>{
                  purchase?.is_done ? 
                  <Text style={tailwind('text-red-500')}>(efectuado)</Text> :
                     new Date(purchase?.code_expiry_date) < new Date() ? 
                        <Text style={tailwind('text-yellow-500')}>(en proceso)</Text> :
                     <Text style={tailwind('text-gray-700')}>(expirada)</Text>
               }</Text>
            </View>
         </View>
      </Ripple>
   );
}

function EmptyMessage(props) {
   return (
      <View style={tailwind('items-center mb-12 mt-16')}>
         <View>
            <Image source={emptyImage} style={[tailwind('w-32 h-48')]} />
         </View>
         <View style={tailwind('px-12')}>
            <Text style={[tailwind('text-gray-700 text-lg text-center'), typefaces.pm]}>
               No haz realizado ninguna compra.
            </Text>
         </View>
      </View>
   );
}

function ExpandedFilter({expanded, onAction, onFilter}){
   
   const [value, setValue] = React.useState("datetime");

   function changeLayout(){
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onAction();
   }

   const onCheck = (value) => {
      setValue(value);
      console.log(value);
   };

   return (
      <View style={[tailwind('flex'), { minHeight: 20 }]}>
         <TouchableOpacity activeOpacity={0.8} onPress={changeLayout}>
         <View style={tailwind('flex flex-row items-center h-8')}>
            <Text>Filtros </Text>
            <AnimatedArrowIcon change={expanded}/>
         </View>
         </TouchableOpacity>
         <View style={{ height: expanded ? null : 0, overflow: 'hidden' }}>
            <View style={tailwind('flex items-center m-2')}>
               <RadioGroup
                  initValue={value}
                  onCheck={onCheck}
                  radios={[
                     {label: "Fecha y hora", value: "datetime"},
                     {label: "Estación", value: "gas_station"}
                  ]}
               />
               <View>
                  {
                     value == "datetime" ?
                     <DateTimeFilter date={new Date()} time={new Date()}/> : <GasFilter></GasFilter>
                  }
               </View>
            </View>
         </View>
         
      </View>
   );
}

function DateTimeFilter({date, time, onValidInput, onInvalidInput}){
   const [state, setState] = React.useState({
      visible: false,
      timeVisible: false,
      paramDate: '',
      paramTime: '',
      toDate: date,
      fromDate: date,
      toTime: time,
      fromTime: time,
      selectToDate: false,
      selectFromDate: false,
      selectToTime: false,
      selectFromTime: false
   });

   const showDatePicker = (param) => {
      console.log(param);
      setState({...state, paramDate: param, visible: true});
   }

   const hideDatePicker = () => {
      setState({...state, visible: false, selectFromDate: false, selectToDate: false})
   }

   const handleConfirm = (date) => {
      if(state.paramDate != ''){
         if(state.paramDate == "toDate"){
            setState({...state, toDate: date, visible: false, selectToDate: true});
         }else if (state.paramDate == "fromDate"){
            setState({...state, fromDate: date, visible: false, selectFromDate: true});
         }
      }else{
         setState({...state, visible: false});
      }
   }

   const showTimePicker = (param) => {
      setState({...state, paramTime: param, timeVisible: true});
   }

   const hideTimePicker = () => {
      setState({...state, timeVisible: false, selectFromTime: false, selectToTime: false})
   }

   const handleConfirmTime = (time) => {
      console.log(formatISODate(time));
      if(state.paramTime != ''){
         if(state.paramTime == "toTime"){
            setState({...state, toTime: time, timeVisible: false, selectToTime: true});
         }else if (state.paramTime == "fromTime"){
            setState({...state, fromTime: time, timeVisible: false, selectFromTime: true});
         }
      }else{
         setState({...state, timeVisible: false});
      }
   }

   return (
      <View style={tailwind('mt-4')}>
         <View>
            <DateTimePickerModal
               isVisible={state.visible}
               mode="date"
               date={
                  state.paramDate != '' ? 
                     state.paramDate == 'toDate'? 
                        state.toDate : 
                     state.paramDate == 'fromDate' ?
                        state.fromDate :
                     date : 
                  date
               }
               onConfirm={handleConfirm}
               onCancel={hideDatePicker}
            />
            <DateTimePickerModal
               isVisible={state.timeVisible}
               mode="time"
               date={
                  state.paramTime != '' ? 
                     state.paramTime == 'toTime'? 
                        state.toTime : 
                     state.paramTime == 'fromTime' ?
                        state.fromTime :
                     time : 
                  time
               }
               onConfirm={handleConfirmTime}
               onCancel={hideTimePicker}
            />
         </View>
         <View>
            <View style={tailwind('flex flex-row items-center justify-between')}>
               <Text>Desde:</Text>
               <View style={tailwind('mx-2')}></View>
               <View style={tailwind('flex rounded-md py-1 px-1 w-24 border border-gray-300')}>
                  <TouchableOpacity onPress={() => showDatePicker("fromDate")}>
                     <View style={tailwind('flex flex-row items-center')}>
                        <CalendarIcon></CalendarIcon>
                        <Text style={tailwind('text-gray-600 text-xs')}>{ state.selectFromDate ?
                         ' ' + formatISODate(state.fromDate, 'dd/MM/yyyy') : ' Día'}
                        </Text>
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={tailwind('mx-1')}></View>
               <View style={tailwind('flex rounded-md py-1 px-1 w-20 border border-gray-300')}>
                  <TouchableOpacity onPress={() => showTimePicker("fromTime")}>
                     <View style={tailwind('flex flex-row items-center')}>
                        <ClockIcon></ClockIcon>
                        <Text style={tailwind('text-gray-600 text-xs')}>{
                           state.selectFromTime ? ' ' + formatISODate(state.fromTime, 'HH:mm') :
                         ' Hora'}</Text>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
            <View style={tailwind('my-1')}></View>
            <View style={tailwind('flex flex-row items-center justify-between')}>
               <Text>Hasta:</Text>
               <View style={tailwind('mx-2')}></View>
               <View style={tailwind('flex rounded-md py-1 px-1 w-24 border border-gray-300')}>
                  <TouchableOpacity onPress={() => showDatePicker("toDate")}>
                     <View style={tailwind('flex flex-row items-center')}>
                        <CalendarIcon></CalendarIcon>
                        <Text style={tailwind('text-gray-600 text-xs')}>{ state.selectToDate ?
                         ' ' + formatISODate(state.toDate, 'dd/MM/yyyy') : ' Día'}
                        </Text>
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={tailwind('mx-1')}></View>
               <View style={tailwind('flex rounded-md py-1 px-1 w-20 border border-gray-300')}>
                  <TouchableOpacity onPress={() => showTimePicker("toTime")}>
                     <View style={tailwind('flex flex-row items-center')}>
                        <ClockIcon></ClockIcon>
                        <Text style={tailwind('text-gray-600 text-xs')}>{
                           state.selectToTime ? ' ' + formatISODate(state.toTime, 'HH:mm') :
                         ' Hora'}</Text>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </View>
   )
}

function GasFilter({onFilter}){
   return (
      <View>
         <GasStationSelector onChange={(item)=> console.log(item)}></GasStationSelector>
         <GasStationSelector onChange={(item)=> console.log(item)}></GasStationSelector>
      </View>
   );
}

export default RecordsView;

   

