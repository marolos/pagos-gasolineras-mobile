import React from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import ChevronDownIcon from './ChevronDownIcon';

export default function AnimatedArrowIcon({ change }) {
   const [value, setValue] = React.useState(new Animated.Value(0));

   React.useEffect(() => {
      Animated.timing(value, {
         toValue: change ? 1 : 0,
         duration: 120,
         easing: Easing.cubic,
      }).start();
   }, [change]);

   const spin = value.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg'],
   });

   return (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
         <ChevronDownIcon />
      </Animated.View>
   );
}
