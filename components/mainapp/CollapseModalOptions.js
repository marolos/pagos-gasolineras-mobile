import React from 'react';
import { View, Text, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import Modal from 'react-native-modal';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { getLogoByPath } from '../../utils/mocks';
import { typefaces } from '../../utils/styles';
import Button from '../shared/Button';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

function CollapseModalOptions({ visible, closeCollapse, company }) {
   const navigation = useNavigation();
   return (
      <Modal
         isVisible={visible}
         testID={'modal'}
         animationIn="fadeInUp"
         animationOut="fadeOutDown"
         onSwipeComplete={closeCollapse}
         onBackdropPress={closeCollapse}
         backdropTransitionOutTiming={0}
         style={tailwind('w-full flex justify-end items-center m-0')}
      >
         <View style={tailwind('w-full h-64 bg-white rounded-t-lg')}>
            <View style={tailwind('p-6')}>
               <View style={tailwind('flex flex-row items-center')}>
                  <Image
                     source={getLogoByPath(company.company.company_logo_path)}
                     style={{ width: 50, height: 50 }}
                  />
                  <Text style={[tailwind('mt-2 ml-2 text-lg'), typefaces.psb]}>
                     {company.company.business_name}
                  </Text>
               </View>
               <View style={tailwind('flex flex-row p-4')}>
                  <Text style={[tailwind('text-lg'), typefaces.pm]}>Saldo disponible:</Text>
                  <Text style={[tailwind('text-lg text-green-600 ml-4'), typefaces.pm]}>
                     ${company.total}
                  </Text>
               </View>
               <View style={tailwind('flex flex-row justify-evenly mt-6')}>
                  <Button
                     text={'recargar'}
                     primary={false}
                     onPress={() => {
                        closeCollapse();
                        setTimeout(
                           () => navigation.navigate('billingData', company.company),
                           400,
                        );
                     }}
                  />
                  <Button
                     text={'comprar'}
                     onPress={() => {
                        closeCollapse();
                        setTimeout(() => navigation.navigate('buy'), 400);
                     }}
                  />
               </View>
               <Ripple
                  style={tailwind('absolute right-0 p-6')}
                  onPress={closeCollapse}
                  rippleCentered
               >
                  <ArrowDownIcon />
               </Ripple>
            </View>
         </View>
      </Modal>
   );
}

export default CollapseModalOptions;
