import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import AdsPaginator from './AdsPaginator';
import tailwind from 'tailwind-rn';
import BalanceCard from './BalanceCard';
import { typefaces } from '../../utils/styles';
import CollapseModalOptions from './CollapseModalOptions';
import Line from '../shared/Line';
import { makeCancelable } from '../../utils/utils';
import Fetch from '../../utils/Fetch';
import emptyImage from '../../assets/background/empty.png';

function BalancesView(props) {
   const [refreshing, setRefreshing] = React.useState(false);
   const [state, setState] = React.useState({
      selectedStation: null,
      modalVisible: false,
      balances: [],
      loading: true,
   });

   React.useEffect(() => {
      const req = loadData(state, setState);
      return () => req.cancel();
   }, []);

   const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      loadData(state, setState, () => setRefreshing(false));
   }, [state]);

   function onPressStation(item) {
      setState((value) => ({
         ...value,
         selectedStation: item,
         modalVisible: true,
      }));
   }

   return (
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
         <View>
            <AdsPaginator />
         </View>
         {state.balances.length > 0 && (
            <View style={tailwind('mt-4 px-6')}>
               <Text style={[tailwind('text-black text-sm'), typefaces.pm]}>Gasolineras</Text>
               <Line style={tailwind('bg-gray-400 w-full mb-2')} />
            </View>
         )}
         <View>
            <GasStationList
               loading={state.loading}
               data={state.balances}
               onItemPress={(station) => onPressStation(station)}
            />
         </View>
         {state.balances.length > 0 && state.selectedStation && (
            <CollapseModalOptions
               visible={state.modalVisible}
               station={state.selectedStation}
               closeCollapse={() => setState((value) => ({ ...value, modalVisible: false }))}
            />
         )}
      </ScrollView>
   );
}

function loadData(state, setState, cb) {
   const cancelControl = makeCancelable(
      Fetch.get('/users/balances/'),
      (res) => {
         setState({ ...state, balances: res.body.balances, loading: false });
         if(cb) cb();
      },
      (err) => {
         if (err.isCanceled) return;
         setState({ ...state, balances: [], loading: false });
         if(cb) cb();
      },
   );

   return cancelControl;
}

function GasStationList({ data, onItemPress, loading }) {
   if (loading) {
      return (
         <View style={[tailwind('flex flex-row justify-center'), { height: 200 }]}>
            <ActivityIndicator animating color="black" size="large" />
         </View>
      );
   }
   if (data.length < 1) {
      return (
         <View>
            <EmptyMessage />
         </View>
      );
   }
   return (
      <View>
         {data.map((item) => (
            <BalanceCard
               key={item.id}
               company={item.company}
               gasStation={item.gas_station}
               total={item.total}
               onPress={() => onItemPress(item)}
            />
         ))}
      </View>
   );
}

function EmptyMessage(props) {
   return (
      <View style={tailwind('items-center mt-6')}>
         <View>
            <Image source={emptyImage} style={[tailwind('w-32 h-48')]} />
         </View>
         <View style={tailwind('px-12')}>
            <Text style={[tailwind('text-gray-600 text-lg text-center'), typefaces.pm]}>
               No haz recargado en ninguna gasolinera aún.
            </Text>
            <Text style={[tailwind('text-gray-500 text-sm text-center'), typefaces.pr]}>
               Usa el buscador para encontrar tu gasolinera favorita
            </Text>
         </View>
      </View>
   );
}

export default connect()(BalancesView);
