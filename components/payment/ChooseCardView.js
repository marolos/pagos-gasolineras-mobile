import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { fakeFetch, cards } from '../../utils/mocks';
import CardItem from './CardItem';
import tailwind from 'tailwind-rn';
import { typefaces } from '../../utils/styles';
import Line from '../shared/Line';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import Ripple from 'react-native-material-ripple';
import LoadingButton from '../shared/LoadingButton';
import NextIcon from '../icons/NextIcon';
import { connect } from 'react-redux';

const initialState = {
   cards: [],
   selectedCard: {},
   loading: false,
};

const reducer = (state, action) => {
   switch (action.type) {
      case 'select':
         return { ...state, selectedCard: action.value };
      case 'set_cards':
         return { cards: action.value, loading: false, selectedCard: action.value[0] };
      case 'loading':
         return { ...state, loading: action.value };
      default:
         throw new Error('there are not default case');
   }
};

function ChooseCardView({ user, navigation, route }) {
   const [state, dispatch] = React.useReducer(reducer, initialState);

   React.useEffect(() => {
      dispatch({ type: 'loading', value: true });
      fakeFetch(cards, 1000)
         .then((cards) => dispatch({ type: 'set_cards', value: cards }))
         .catch((err) => {});
   }, []);

   function next() {
      console.log('::  ChooseCardView ::', user, state.selectedCard, route.params);
   }

   return (
      <View style={{ flex: 1 }}>
         <View style={tailwind('m-4')}>
            <Text style={[tailwind('mb-4 ml-2'), typefaces.pm]}>Tarjetas guardadas:</Text>
            <View>
               {state.loading && <ActivityIndicator animating color="black" />}
               {state.cards.map((card) => (
                  <CardItem
                     {...card}
                     key={card.id.toString()}
                     selected={state.selectedCard.id === card.id}
                     onPress={() => dispatch({ type: 'select', value: card })}
                  />
               ))}
            </View>
         </View>
         <Line style={tailwind('bg-gray-300 w-full mt-2 mb-1')} />
         <View style={tailwind('items-center mt-12')}>
            <Ripple
               onPress={() =>
                  navigation.push('addCard', {...route.params })
               }
               style={tailwind('w-48 bg-white border rounded border-gray-300')}
            >
               <View style={tailwind('flex flex-row justify-between items-center px-6 py-3')}>
                  <Text style={[typefaces.pm, tailwind('mr-4 ')]}>Usar otra tarjeta</Text>
                  <ArrowRightIcon />
               </View>
            </Ripple>
         </View>

         <View style={tailwind('absolute bottom-0 right-0')}>
            <LoadingButton
               icon={<NextIcon />}
               iconPos={'right'}
               text="continuar"
               style={tailwind('w-48 self-end mr-6 mb-6')}
               onPress={next}
            />
         </View>
      </View>
   );
}

export default connect((state) => ({ user: state.user.data }))(ChooseCardView);
