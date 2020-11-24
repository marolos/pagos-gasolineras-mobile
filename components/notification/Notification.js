import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { FULL_WIDTH } from '../utils/constants';

export default function Notification({ title }) {
   return (
      <Ripple style={styles.item} rippleSize={FULL_WIDTH} >
			<View>

			</View>
			<Text style={styles.title}>{title}</Text>
      </Ripple>
   );
}

const styles = StyleSheet.create({
   item: {
		padding: 20,
		backgroundColor: 'white'
   },
   title: {
      fontSize: 32,
   },
});
