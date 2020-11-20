import React from 'react'
import { View, Text, FlatList, ActivityIndicator} from "react-native";
import Fetch from '../utils/Fetch';
import tailwind from 'tailwind-rn';
import { makeCancelable } from '../utils/utils';
import Ripple from 'react-native-material-ripple';
import ScheduleIcon from '../icons/ScheduleIcon'
import InfoIcon from '../icons/InfoIcon'
import { typefaces } from '../utils/styles';
import { formatISODate } from '../buy/utils';


export default function RecordsView(props) {
   
   const [refreshing, setRefreshing] = React.useState(false);
   const [state, setState] = React.useState({
      page: 0,
      purchases: [],
      loading: true,
   });

   React.useEffect(() => {
      const req = loadData(state, setState);
      return () => req.cancel(); 
   }, []);


  return (
    <View>
      <Text>historial</Text>
      <PurchasesList data={state.purchases}/>
    </View>
  );

function loadData(state, setState){
   const cancelControl = makeCancelable(
      Fetch.get("/purchase/user/?page="+ state.page),
      (value) => {
         setState({...state, purchases: value.body, loading: false});
      },
      (err) => {
         if (err.isCanceled) return;
         setState({ ...state, purchases: [], loading: false });
      },
   );

   return cancelControl;
}

  function PurchasesList({data, onItemTap}){
      if(state.loading){
         return (
               <View style={[tailwind('flex flex-row justify-center'), { height: 200 }]}>
                  <ActivityIndicator animating color="black" size="large" />
               </View>
         );
      }      
      if (data.length == 0) {
         return (
            <View>
               <Text>Vacio</Text>
            </View>
      );
   }
   return (
      <View>
         <FlatList 
         data={data}
         renderItem={({item}) => <PurchaseItem purchase={item}></PurchaseItem>}
         />
      </View>
   );
  }

   function PurchaseItem({purchase}){
      let a = 0.0
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
                        {purchase.gas_station.name}</Text> por </Text>
                  <Text style={[tailwind('text-green-600'), typefaces.pm]}>
                     ${parseFloat(purchase.amount).toFixed(2)}
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
                     {formatISODate(purchase.created_at)} </Text>
                  <Text style={[tailwind('text-xs')]}>{
                     purchase.is_done ? 
                     <Text style={tailwind('text-red-500')}>(efectuado)</Text> :
                        new Date(purchase.code_expiry_date) < new Date() ? 
                           <Text style={tailwind('text-yellow-500')}>(en proceso)</Text> :
                        <Text style={tailwind('text-gray-700')}>(expirada)</Text>
                  }</Text>
               </View>
            </View>
         </Ripple>
   );
   }

}
