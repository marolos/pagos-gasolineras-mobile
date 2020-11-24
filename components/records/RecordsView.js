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
import Fetch from '../utils/Fetch';
import tailwind from 'tailwind-rn';
import { makeCancelable } from '../utils/utils';
import Ripple from 'react-native-material-ripple';
import ScheduleIcon from '../icons/ScheduleIcon';
import AnimatedArrowIcon from '../icons/AnimatedArrowIcon';
import InfoIcon from '../icons/InfoIcon';
import { typefaces } from '../utils/styles';
import { formatISODate } from '../buy/utils';
import CompanySelector from './CompanySelector';
import GasStationSelector from './GasStationSelector';
import emptyImage from '../../assets/background/empty.png';
import SimpleToast from 'react-native-simple-toast';
import DateTimeFilter from './DateTimeFilter';

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
      this.setState({refreshing: true, page: 0});
      let filters = { page: 0 };
      if(this.state.fromDateTime && this.state.toDateTime){
         filters['to'] = formatISODate(this.state.toDateTime, "yyyy-MM-dd HH:mm");
         filters['from'] = formatISODate(this.state.fromDateTime, "yyyy-MM-dd HH:mm");
      }else if(this.state.gasStation){
         filters['gas'] = this.state.gasStation;
      }
      this.cancelControl = makeCancelable(
         Fetch.get('/purchase/user/', filters),
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
      let filters = { page: 0 };
      if(fromDatetime && toDatetime){
         filters['from'] = formatISODate(fromDatetime, "yyyy-MM-dd HH:mm");
         filters['to'] = formatISODate(toDatetime, "yyyy-MM-dd HH:mm");
         this.setState({fromDateTime: fromDatetime, toDateTime: toDatetime, gasStation: null, page: 0});
      }
      else if(gasStation){
         filters['gas'] = gasStation.id;
         this.setState({fromDateTime: null, toDateTime: null, gasStation: gasStation,  page: 0});
      }else{
         this.setState({fromDateTime: null, toDateTime: null, gasStation: null,  page: 0});
      }
      this.loadData(filters)
   };

   onItemTap = (purchase) => {
      this.props.navigation.push('purchaseDetail', purchase);
   }
   
   onScroll = (nativeEvent) => {
      if(isCloseToBottom(nativeEvent)){
         this.setState({loadMore: true, page: ++this.state.page});
         let filters = { page: this.state.page };
         if(this.state.fromDateTime && this.state.toDateTime){
           filters['to'] = formatISODate(this.state.toDateTime, "yyyy-MM-dd HH:mm");
           filters['from'] = formatISODate(this.state.fromDateTime, "yyyy-MM-dd HH:mm");
         }else if(this.state.gasStation){
            filters['gas'] = this.state.gasStation;
         }
         this.loadMoreData(filters);
      }
   }

   onClearDateTime = () => {
      this.setState({fromDateTime: null, toDateTime: null});
   }

   render(){
      return (
         <ScrollView
            scrollEventThrottle={400}
            onScroll={({nativeEvent}) => this.onScroll(nativeEvent)}
            refreshControl={
               <RefreshControl onRefresh={this.onRefresh} refreshing={this.state.refreshing} />
            }>

            <View>
               <View style={[tailwind('my-3 mx-2'), { zIndex: 10 }]}>
                  <ExpandedFilter 
                     expanded={this.state.filterExpanded} 
                     onAction={this.onAction}
                     onFilter={(fdt, tdt, g) => this.onFilter(fdt, tdt, g)}
                     onClearDateTime={() => this.onClearDateTime()}/>
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
      <Ripple style={tailwind('mx-2 my-1')} onPress={()=>onTap()}>
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
            <View style={tailwind('flex flex-row justify-end items-center')}>
               <Text style={[tailwind('text-gray-700 text-xs mr-1'), typefaces.pm]}>Factura</Text>
               <InfoIcon width={14} height={14} fill={'#555'}></InfoIcon>
            </View>
            <View style={tailwind('flex flex-row ml-4')}>
               <Text style={[tailwind('text-gray-700 text-xs'), typefaces.pm]}>
                  {formatISODate(purchase?.created_at ? purchase?.created_at : new Date())} </Text>
               <Text style={[tailwind('text-xs')]}>{
                  purchase?.is_done ? 
                  <Text style={tailwind('text-red-500')}>(efectuado)</Text> :
                     new Date(purchase?.code_expiry_date) > new Date() ? 
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
               No hay compras para mostrar.
            </Text>
         </View>
      </View>
   );
}

function ExpandedFilter({expanded, onAction, onFilter, onClearDateTime}){
   
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

   const onClearFilterDateTime = () => {
      setState({ ...state, filter: false })
      onClearDateTime();
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
                        onClear={()=> onClearFilterDateTime()}
                        /> : 
                     <GasFilter onFilter={(item)=> console.log(item)}></GasFilter>
                  }
               </View>
            </View>
         </View>
         
      </View>
   );
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

   

