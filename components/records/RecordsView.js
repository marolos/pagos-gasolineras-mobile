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
import emptyImage from '../../assets/background/empty.png';
import SimpleToast from 'react-native-simple-toast';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
   const paddingToBottom = 20;
   return layoutMeasurement.height + contentOffset.y >= 
      contentSize.height - paddingToBottom;
}

class RecordsView extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         page: 0,
         purchases: [],
         loading: true, 
         loadMore: false,  
         refreshing: false,
         filterExpanded: false,
         isEndPage: false,
         fromDateTime: null,
         toDateTime: null,
         gasStation: null
      };
      if(Platform.OS == 'android'){
         UIManager.setLayoutAnimationEnabledExperimental(true);
      }
   }

   componentDidMount(){
      this.loadData({ page: this.state.page});
   }

   loadData(filters){
      this.setState({loading: true})
      this.cancelControl = makeCancelable(
         Fetch.get("/purchase/user/", filters),
         (value) => {
            this.setState({ purchases: value.body, loading: false });
         },
         (err) => {
            if (err.isCanceled) return;
            this.setState({ purchases: [], loading: false });
         },
      );   
   }
   
   loadMoreData(filters){
      if(!this.state.isEndPage){
         this.cancelControl = makeCancelable(
            Fetch.get("/purchase/user/", filters),
            (value) => {
               if(value.body.length > 0){
                  for(var i in value.body){
                     this.state.purchases.push(value.body[i]);
                  }
               }else{
                  this.setState({ purchases: data, loadMore: false, isEndPage: true });
               }
            },
            (err) => {
               if (err.isCanceled) return;
               this.setState({ purchases: this.state.purchases, loadMore: false });
            },
         );   
      }
   }

   componentWillUnmount(){
      this.cancelControl.cancel();
   }

   onRefresh = () => {
      this.setState({ refreshing: true });
      this.cancelControl = makeCancelable(
         Fetch.get('/purchase/user/', { page: 0 }),
         (res) => {
            this.setState({ purchases: res.body, loading: false, refreshing: false, isEndPage: false, page: 0 });
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

   onFilter = (fromDatetime, toDatetime, gasStation) => {
      /* let filters = { page: this.state.page };
      if(fromDatetime && toDatetime){
         filters['from'] = formatISODate(fromDatetime, "yyyy-MM-dd");
         filters['to'] = formatISODate(fromDatetime, "yyyy-MM-dd");
         this.setState({fromDateTime: fromDatetime, toDateTime: toDatetime, gasStation: null});
      }
      else if(gasStation){
         filters['gas'] = gasStation.id;
         this.setState({fromDateTime: null, toDateTime: null, gasStation: gasStation});
      }else{
         this.setState({fromDateTime: null, toDateTime: null, gasStation: null});
      }
      
      this.loadData(filters) */
      console.log(fromDatetime);
      console.log(toDatetime);
   };

   onItemTap = (purchase) => {
      //this.props.navigation.push('purchaseDetail', purchase);
   }

   render(){
      return (
         <ScrollView
            scrollEventThrottle={400}
            onScroll={({nativeEvent}) => {
               if(isCloseToBottom(nativeEvent)){
                  this.setState({loadMore: true, page: ++this.state.page});
                  let filters = { page: this.state.page };
                  if(this.state.fromDateTime && this.state.toDateTime){
                    filters['to'] = this.state.toDateTime;
                    filters['from'] = this.state.fromDateTime;
                  }else if(this.state.gasStation){
                     filters['gas'] = this.state.gasStation;
                  }
                  this.loadMoreData(filters);
               }
            }}
            refreshControl={
               <RefreshControl onRefresh={this.onRefresh} refreshing={this.state.refreshing} />
            }>

            <View>
               <View style={[tailwind('my-3 mx-2'), { zIndex: 10 }]}>
                  <ExpandedFilter 
                     expanded={this.state.filterExpanded} 
                     onAction={this.onAction}
                     onFilter={(fdt, tdt, g) => this.onFilter(fdt, tdt, g)}/>
               </View>
            {this.state.loading ? 
                  <View style={[tailwind('flex flex-row justify-center'), { height: 200 }]}>
                     <ActivityIndicator animating color="black" size="large" />
                  </View>
               : this.state.purchases.length == 0 ? <EmptyMessage/> :
               <View style={{ zIndex: -1 }}>
                  <Text style={tailwind('mx-2')}>Resultados: </Text>
                  <PurchasesList 
                     onItemTap={this.onItemTap}
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
               <PurchaseItem purchase={item} onTap={() => onItemTap(item)}></PurchaseItem>
            </View>
         )
      }
      </View>
   );
}

function PurchaseItem({purchase, onTap}){
   return (
      <Ripple onPress={()=> {}} style={tailwind('mx-2 my-1')} onPress={()=>onTap()}>
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
   
   const [state, setState] = React.useState({
      value: "datetime",
      filter: false
   });
   
   function changeLayout(){
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onAction();
   }

   const onCheck = (value) => {
      setState({ ...state, value: value });
   };

   const onInvalidInput = (msg) => {
      setState({...state, filter: false});
      SimpleToast.show(msg);
   }

   const onValidInput = (from_datetime, to_datetime) => {
      SimpleToast.show("Filtrando...");
      setState({...state, filter: true});
      onFilter(from_datetime, to_datetime, null);
   }

   
   return (
      <View style={[tailwind('flex'), { minHeight: 20 }]}>
         <TouchableOpacity activeOpacity={0.8} onPress={changeLayout}>
         <View style={tailwind('flex flex-row items-center h-8')}>
            <Text>Filtros{state.filter ? '*' : ''} </Text>
            <AnimatedArrowIcon change={expanded}/>
         </View>
         </TouchableOpacity>
         <View style={{ height: expanded ? null : 0, overflow: 'hidden' }}>
            <View style={tailwind('flex items-center m-2')}>
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
                        date={new Date()} 
                        time={new Date()}
                        onInvalidInput={onInvalidInput}
                        onValidInput={(fdt, tdt) => onValidInput(fdt, tdt)}
                        onClear={()=>setState({ ...state, filter: false })}
                        /> : 
                     <GasFilter onFilter={(item)=> console.log(item)}></GasFilter>
                  }
               </View>
            </View>
         </View>
         
      </View>
   );
}

function DateTimeFilter({date, time, onValidInput, onInvalidInput, onClear}){
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

   const isValid = () => {
      const selectedRangeDate = state.selectFromDate && state.selectToDate;
      const selectedRangeTime = state.selectFromTime && state.selectToTime;
      if(selectedRangeDate && selectedRangeTime){
         let fromDatetime = 
                  new Date(state.fromDate.getFullYear, 
                        state.fromDate.getMonth, 
                        state.fromDate.getDate, 
                        state.fromTime.getHours, 
                        state.fromTime.getMinutes)
         let toDatetime = 
                  new Date(state.toDate.getFullYear, 
                        state.toDate.getMonth, 
                        state.toDate.getDate, 
                        state.toTime.getHours, 
                        state.toTime.getMinutes)
         console.log(fromDatetime.getTime());
         console.log(toDatetime);
         if(fromDatetime > toDatetime){
            onInvalidInput('Rango de fechas incorrecto');
         }else{
            onValidInput(fromDatetime, toDatetime);
         }
      }else{
         onClear();
      }
   }

   const showDatePicker = (param) => {
      setState({...state, paramDate: param, visible: true});
   }

   const hideDatePicker = () => {
      if(state.paramDate == "toDate"){
         setState({...state, visible: false, selectToDate: false})
      }else if(state.paramDate == "fromDate"){
         setState({...state, visible: false, selectFromDate: false})
      }
      
   }

   const handleConfirm = (date) => {
      if(state.paramDate != ''){
         if(state.paramDate == "toDate"){
            setState({...state, toDate: date, visible: false, selectToDate: true});
            isValid();
         }else if (state.paramDate == "fromDate"){
            setState({...state, fromDate: date, visible: false, selectFromDate: true});
            isValid();
         }
      }else{
         setState({...state, visible: false});
         isValid();
      }
   }

   const showTimePicker = (param) => {
      setState({...state, paramTime: param, timeVisible: true});
   }

   const hideTimePicker = () => {
      if(state.paramTime == "toTime"){
         setState({...state, timeVisible: false, selectToTime: false})
      }else if(state.paramTime == "fromTime"){
         setState({...state, timeVisible: false, selectFromTime: false})
      }
   }

   const handleConfirmTime = (time) => {
      if(state.paramTime != ''){
         if(state.paramTime == "toTime"){
            setState({...state, toTime: time, timeVisible: false, selectToTime: true});
            isValid();
         }else if (state.paramTime == "fromTime"){
            setState({...state, fromTime: time, timeVisible: false, selectFromTime: true});
            isValid();
         }
      }else{
         setState({...state, timeVisible: false});
         isValid();
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
   const [company, setCompany] = React.useState(null);
   return (
      <View>
         <CompanySelector onChange={(item) => setCompany(item)}></CompanySelector>
         <GasStationSelector id={1} onChange={(item)=> onFilter(item)}></GasStationSelector>
      </View>
   );
}

export default RecordsView;

   

