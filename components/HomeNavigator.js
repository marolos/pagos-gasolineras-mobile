import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import TabMenuNavigator from './tabmenu/TabMenuNavigator';
import TopupView from './topup/TopupView';
import BuyView from './buy/BuyView';


const Stack = createStackNavigator()

function HomeNavigator(props) {
  return (
		<Stack.Navigator>
			<Stack.Screen
				name="tabmenu"
				component={TabMenuNavigator}
			/>
			<Stack.Screen
				name="topup"
				component={TopupView}
			/>
			<Stack.Screen
				name="buy"
				component={BuyView}
			/>
		</Stack.Navigator>
  )
}


const mapStateToProps = (state) => ({
  activeTab: state.activeTab,
});

export default connect(mapStateToProps)(HomeNavigator);
