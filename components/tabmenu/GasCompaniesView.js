import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/actions';

function GasCompaniesView(props) {
  return (
    <View>
      <Text>home</Text>
			<Button title="logout" onPress={()=> props.dispatch(logout())} />
    </View>
  );
}

export default connect()(GasCompaniesView)
