import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import CustomButton from '../shared/CustomButton';

function SignupView(props) {
  return (
    <View>
      <CustomButton>Sign up</CustomButton>
    </View>
  );
}

export default connect()(SignupView);
