import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import TabMenuNavigator from './tabmenu/TabMenuNavigator';
import TopupView from './topup/TopupView';
import BuyView from './buy/BuyView';
import { CustomHeaderTitle, CustomHeaderLeft } from './shared/CustomHeader';

const Stack = createStackNavigator();

function HomeNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen
        name="tabmenu"
        component={TabMenuNavigator}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
          headerTitle: () => <CustomHeaderTitle />,
        })}
      />
      <Stack.Screen name="topup" component={TopupView} />
      <Stack.Screen name="buy" component={BuyView} />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => ({
  activeTab: state.activeTab,
});

export default connect(mapStateToProps)(HomeNavigator);
