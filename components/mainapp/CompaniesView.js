import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/actions';
import AdsPaginator from './AdsPaginator';
import tailwind from 'tailwind-rn';
import CompanyCard from './CompanyCard';
import { typefaces } from '../../utils/styles';
import CollapseModalOptions from './CollapseModalOptions';
import Line from '../shared/Line';
import { DummyGrid } from '../shared/DummyGrid';
import { makeCancelable } from '../../utils/utils';
import Fetch from '../../utils/Fetch';

function CompaniesView(props) {
   const [state, setState] = React.useState({
      selectedCompany: null,
      modalVisible: false,
      companies: [],
      loading: true,
   });

   React.useEffect(() => {
      const req = makeCancelable(
         Fetch.get('/users/balances/'),
         (res) => {
            setState({ ...state, companies: res.body.balances, loading: false });
         },
         (err) => {
            if (err.isCanceled) return;
            setState({ ...state, companies: [], loading: false });
         },
      );
      return () => req.cancel();
   }, []);

   function onPressCompany(item) {
      setState((state) => ({
         ...state,
         selectedCompany: item,
         modalVisible: true,
      }));
   }

   return (
      <ScrollView>
         <View>
            <AdsPaginator />
         </View>
         {state.companies.length > 0 && (
            <View style={tailwind('mt-4 px-6')}>
               <Text style={[tailwind('text-black text-sm'), typefaces.pm]}>Gasolineras</Text>
               <Line style={tailwind('bg-gray-400 w-full mb-2')} />
            </View>
         )}
         <View style={tailwind('items-center')}>
            <DummyGrid
               loading={state.loading}
               data={state.companies}
               GridItemComponent={CompanyCard}
               ncol={3}
               onItemPress={(company) => onPressCompany(company)}
            />
         </View>
         {state.companies.length > 0 && state.selectedCompany && (
            <CollapseModalOptions
               visible={state.modalVisible}
               company={state.selectedCompany}
               closeCollapse={() => setState((state) => ({ ...state, modalVisible: false }))}
            />
         )}
         <View style={{ marginTop: 430 }}>
            <Button title="logout" onPress={() => props.dispatch(logout())} />
         </View>
      </ScrollView>
   );
}

export default connect()(CompaniesView);
