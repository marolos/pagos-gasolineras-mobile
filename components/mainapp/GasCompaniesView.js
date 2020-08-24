import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/actions';
import AdsPaginator from './AdsPaginator';
import tailwind from 'tailwind-rn';
import { companies } from '../../utils/mocks';
import CompanyCard from './CompanyCard';
import { typefaces } from '../../utils/styles';
import CollapseModalOptions from './CollapseModalOptions';
import Line from '../shared/Line';
import { DummyGrid } from '../shared/DummyGrid';

function GasCompaniesView(props) {
   const [state, setState] = React.useState({
      selectedCompany: {},
      modalVisible: false,
      companies: companies,
   });

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
         <View style={tailwind('mt-4 px-6')}>
            <Text style={[tailwind('text-black text-base'), typefaces.pm]}>Gasolineras</Text>
            <Line style={tailwind('bg-gray-400 w-full mb-2')} />
         </View>
         <View style={tailwind('items-center')}>
            <DummyGrid
               data={companies}
               GridItemComponent={CompanyCard}
               ncol={3}
               onItemPress={(company) => onPressCompany(company)}
            />
         </View>
         <CollapseModalOptions
            visible={state.modalVisible}
            company={state.selectedCompany}
            closeCollapse={() => setState((state) => ({ ...state, modalVisible: false }))}
         />
         <View style={tailwind('mt-40')}>
            <Button title="logout" onPress={() => props.dispatch(logout())} />
         </View>
      </ScrollView>
   );
}

export default connect()(GasCompaniesView);
