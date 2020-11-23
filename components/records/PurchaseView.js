import React from 'react';
import { makeCancelable } from '../utils/utils';
import Fetch from '../utils/Fetch';
import {View, Text} from 'react-native';

class PurchaseView extends React.Component {

   constructor(props){
      super(props);
      this.state = {
         loading: true,
         //purchase: props.purchase
      };
   }

   /* componentDidMount(){
      this.cancelControl = makeCancelable(
         Fetch.get("/purchase/user/" + this.state.purchase.id + '/', {is_done: this.state.purchase.id.is_done}),
         (value) => {
            this.setState({ purchase: value.body, loading: false });
         },
         (err) => {
            if (err.isCanceled) return;
            this.setState({ loading: false });
         },
      ); 
   }
 */
   render(){
      return (
         <View>
            <Text>Hello</Text>
         </View>
      );
   }

}

export default PurchaseView;