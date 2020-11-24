import React, { memo } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import AdsPaginator from './AdsPaginator';
import tailwind from 'tailwind-rn';
import BalanceCard from './BalanceCard';
import { typefaces } from '../utils/styles';
import CollapseModalOptions from './CollapseModalOptions';
import Line from '../shared/Line';
import { makeCancelable } from '../utils/utils';
import Fetch from '../utils/Fetch';
import emptyImage from '../../assets/background/empty.png';
import { setActiveTab } from '../redux/actions';
import { TabOptions } from '../redux/reducers';

class BalancesView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedStation: null,
         modalVisible: false,
         balances: [],
         loading: true,
         refreshing: false,
      };
   }

   componentDidMount() {
      this.reqCancelControl = this.loadData();
      this.unsubscribeFocus = this.props.navigation.addListener('focus', () => {
         this.props.dispatch(setActiveTab(TabOptions.GAS));
      });
   }

   componentWillUnmount() {
      if (this.reqCancelControl) this.reqCancelControl.cancel();
      if (this.unsubscribeFocus) this.unsubscribeFocus();
   }

   loadData = (cb) => {
      const cancelControl = makeCancelable(
         Fetch.get('/users/balances/'),
         (res) => {
            this.setState({ balances: res.body.balances, loading: false });
            if (cb) cb();
         },
         (err) => {
            if (err.isCanceled) return;
            this.setState({ balances: [], loading: false });
            if (cb) cb();
         },
      );

      return cancelControl;
   };

   onRefresh = () => {
      this.setState({ refreshing: true });
      this.reqCancelControl = this.loadData(() => this.setState({ refreshing: false }));
   };

   onPressStation = (item) => {
      this.setState({
         selectedStation: item,
         modalVisible: true,
      });
   };

   render() {
      const { balances, refreshing, loading, selectedStation, modalVisible } = this.state;
      return (
         <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
         >
            <View>
               <AdsPaginator />
            </View>
            {balances.length > 0 && (
               <View style={tailwind('mt-4 px-6')}>
                  <Text style={[tailwind('text-black text-sm'), typefaces.pm]}>Gasolineras</Text>
                  <Line style={tailwind('bg-gray-400 w-full mb-2')} />
               </View>
            )}
            <View>
               <GasStationList
                  loading={loading}
                  data={balances}
                  onItemPress={this.onPressStation}
               />
            </View>
            {balances.length > 0 && selectedStation && (
               <CollapseModalOptions
                  visible={modalVisible}
                  station={selectedStation}
                  closeCollapse={() => this.setState({ modalVisible: false })}
               />
            )}
         </ScrollView>
      );
   }
}

const GasStationList = memo(({ data, onItemPress, loading }) => {
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
});

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
