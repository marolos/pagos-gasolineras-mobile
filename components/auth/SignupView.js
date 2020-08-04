import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import LoadingButton from '../shared/LoadingButton';

function SignupView(props) {
  return (
    <View>
      <LoadingButton text={'signup'}/>
    </View>
  );
}

export default connect()(SignupView);
