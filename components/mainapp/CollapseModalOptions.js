import React from 'react';
import { View, Text, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import Modal from 'react-native-modal';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { typefaces } from '../../utils/styles';
import Button from '../shared/Button';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image';

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
         style={styles.modal}
      >
         <View style={styles.view}>
            <View style={tailwind('p-6')}>
               <View style={styles.title}>
                  <FastImage
                     source={{ uri: company.company.company_logo_path }}
                     style={styles.image}
                  />
                  <Text style={styles.titleText}>{company.company.business_name}</Text>
               </View>
               <View style={styles.total}>
                  <Text style={styles.totalText}>Saldo disponible:</Text>
                  <Text style={styles.totalValue}>${company.total}</Text>
               </View>
               <View style={styles.options}>
                  <Button
                     text={'recargar'}
                     primary={false}
                     onPress={() => {
                        closeCollapse();
                        setTimeout(() => navigation.navigate('billingData', company.company), 400);
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

const styles = {
   modal: tailwind('w-full flex justify-end items-center m-0'),
   view: tailwind('w-full h-64 bg-white rounded-t-lg'),
   title: tailwind('flex flex-row items-center'),
   titleText: [tailwind('mt-2 ml-2 text-lg'), typefaces.psb],
   image: { width: 50, height: 50 },
   total: tailwind('flex flex-row p-4'),
   totalText: [tailwind('text-lg'), typefaces.pm],
   totalValue: [tailwind('text-lg text-green-600 ml-4'), typefaces.pm],
   options: tailwind('flex flex-row justify-evenly mt-6'),
};

export default CollapseModalOptions;
