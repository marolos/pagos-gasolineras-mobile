import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';
import Modal from 'react-native-modal';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { typefaces } from '../utils/styles';
import Button from '../shared/Button';
import Ripple from 'react-native-material-ripple';
import Fetch from '../utils/Fetch';
import FastImage from 'react-native-fast-image';
import StarIcon from '../icons/StarIcon';


class CollapseSelectedStation extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loaded: false,
         hasCredit: false,
         company: {},
      };
   }

   componentDidMount() {
      if (this.props.station) {
         this.loadData();
      }
   }

   componentDidUpdate(prevProps) {
      if (prevProps.station.id !== this.props.station.id) {
         this.loadData();
      }
   }

   loadData = () => {
      this.setState({ loaded: false, hasCredit: false });
      const { station } = this.props;
      Fetch.get(`/company/station/${station.id}/`)
         .then((res) => {
            this.setState({ company: res.body.station.company, loaded: true });
         })
         .catch((err) => {
            err;
         });
      Fetch.get('/users/balances/', { station_id: station.id })
         .then((res) => {
            const { balance } = res.body;
            this.setState({ hasCredit: balance && balance.total > 0 });
         })
         .catch((err) => {
            this.setState({ hasCredit: false });
         });
   };

   onTopup = () => {
      const { company } = this.state;
      const { closeCollapse, station, navigation } = this.props;
      closeCollapse();
      setTimeout(
         () =>
            navigation.navigate('billingData', {
               gas_station: station,
               company,
            }),
         200,
      );
   };

   onBuy = () => {
      const { company } = this.state;
      const { closeCollapse, station, navigation } = this.props;
      closeCollapse();
      setTimeout(
         () =>
            navigation.navigate('buy', {
               gas_station: station,
               company,
            }),
         200,
      );
   };

   onFeedback = () => {
      this.props.navigation.navigate('feedback', {
         screen: 'feedbackView',
         params: { station: this.props.station },
      });
   };

   render() {
      const { loaded, company, hasCredit } = this.state;
      const { closeCollapse, visible, station } = this.props;

      return (
         <Modal
            isVisible={visible}
            testID={'modal'}
            animationIn="fadeInUp"
            animationOut="fadeOutDown"
            onSwipeComplete={closeCollapse}
            onBackdropPress={closeCollapse}
            backdropTransitionOutTiming={0}
            backdropOpacity={0.3}
            style={styles.modal}
         >
            <View style={styles.view}>
               <Ripple style={styles.arrow} onPress={closeCollapse} rippleCentered>
                  <ArrowDownIcon />
               </Ripple>
               <View style={tailwind('pt-1 px-6')}>
                  <View style={styles.title}>
                     {loaded ? <></> : <ActivityIndicator color="black" size="small" animating />}
                     {loaded && (
                        <FastImage
                           source={{ uri: company.company_logo_path }}
                           style={styles.image}
                        />
                     )}
                     <View>
                        <Text style={styles.titleText}>{station.name}</Text>
                        <Text style={styles.address}>{station.address}</Text>
                        {loaded && (
                           <View style={tailwind('flex flex-row items-center ml-2')}>
                              <Text
                                 style={[
                                    tailwind('text-base text-gray-700 mt-1 mr-1'),
                                    typefaces.pm,
                                 ]}
                              >
                                 {station.global_purchase_rating.toFixed(1)}
                              </Text>
                              <StarIcon fill={'#FBBF24'} stroke="#FBBF24" />
                           </View>
                        )}
                     </View>
                  </View>
                  <View style={tailwind('w-full flex items-center justify-center my-2')}>
                     <Ripple onPress={this.onFeedback} rippleCentered>
                        <Text style={{ textDecorationLine: 'underline' }}>
                           Sugerencias o reclamos
                        </Text>
                     </Ripple>
                  </View>
                  <View style={styles.options}>
                     <Button text={'recargar'} onPress={this.onTopup} primary={!hasCredit} />
                     {hasCredit && <Button text={'comprar'} onPress={this.onBuy} />}
                  </View>
               </View>
            </View>
         </Modal>
      );
   }
}

const styles = {
   modal: tailwind('w-full flex justify-end items-center m-0'),
   view: tailwind('w-full h-64 bg-white rounded-t-lg'),
   title: tailwind('flex flex-row items-center mt-4'),
   titleText: [tailwind('mt-2 ml-2 text-base'), typefaces.psb],
   address: [tailwind('ml-2 text-sm text-gray-600'), typefaces.pm],
   image: { width: 50, height: 50 },
   total: tailwind('flex flex-row p-4'),
   totalText: [tailwind('text-base'), typefaces.pm],
   totalValue: [tailwind('text-lg text-green-600 ml-4'), typefaces.pm],
   options: tailwind('flex flex-row justify-evenly mt-4'),
   arrow: tailwind('absolute right-0 p-6'),
};

export default CollapseSelectedStation;
