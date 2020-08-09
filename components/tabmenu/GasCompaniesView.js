import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/actions';
import AdsPaginator from './AdsPaginator';
import tailwind from 'tailwind-rn';

function GasCompaniesView(props) {
  return (
    <View>
      <View>
        <AdsPaginator />
      </View>
      <Text style={tailwind('mt-8')}>home</Text>
      <Button title="logout" onPress={() => props.dispatch(logout())} />
    </View>
  );
}

export default connect()(GasCompaniesView);
