import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../redux/actions';
import { TabOptions } from '../redux/reducers';

export default function HandleNotification({ navigation, route }) {
   const dispatch = useDispatch();
   console.log('params::', route.params);
   return (
      <View>
         <Text>profile</Text>
         <Button
            onPress={() => {
               navigation.navigate('tabMenu', { screen: 'notifications' });
               dispatch(setActiveTab(TabOptions.NOTIFICATIONS));
            }}
            title="xxx"
         />
      </View>
   );
}
