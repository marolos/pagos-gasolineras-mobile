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
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
};
