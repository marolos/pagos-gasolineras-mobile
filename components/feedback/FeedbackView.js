import React from 'react';
import { View, Text } from 'react-native';

export default class FeedbackView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         station: null,
      };
   }

   componentDidMount() {
		const { params } = this.props.route;
		console.log(this.props.route)
      if (params && params.station) {
         this.setState({ station: params.station });
      }
   }
   render() {
      return (
         <View>
            <Text>feedback</Text>
            {this.state.station && <Text>{this.state.station.name}</Text>}
         </View>
      );
   }
}
