import { StyleSheet } from 'react-native';

export const typefaces = StyleSheet.create({
   pr: {
      fontFamily: 'Poppins-Regular',
   },
   pm: {
      fontFamily: 'Poppins-Medium',
   },
   psb: {
      fontFamily: 'Poppins-SemiBold',
   },
   pb: {
      fontFamily: 'Poppins-Bold',
   },
});

export const shadowStyle = {
   shadowColor: '#000',
   shadowOffset: {
      width: 0,
      height: 12,
   },
   shadowOpacity: 0.58,
   shadowRadius: 16.0,

   elevation: 30,
};
