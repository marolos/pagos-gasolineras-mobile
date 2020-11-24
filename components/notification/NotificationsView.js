import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { setActiveTab } from '../redux/actions';
import { TabOptions } from '../redux/reducers';
import Line from '../shared/Line';
import Notification from './Notification';

class NotificationsView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         refreshing: false,
         notifications: [],
         loadingMore: false,
      };
   }
   componentDidMount() {
      this.unsubscribeFocus = this.props.navigation.addListener('focus', () => {
         this.props.dispatch(setActiveTab(TabOptions.NOTIFICATIONS));
      });
      this.setState({ refreshing: true });
      setTimeout(
         () =>
            this.setState({
               refreshing: false,
               notifications: noti,
            }),
         1000,
      );
   }

   componentWillUnmount() {
      if (this.unsubscribeFocus) this.unsubscribeFocus();
   }

   onRefresh = () => {
      this.setState({ refreshing: true });
      setTimeout(() => this.setState({ refreshing: false }), 1500);
   };

   onEndReached = () => {
      this.setState({ loadingMore: true });
      setTimeout(() => this.setState({ loadingMore: false }), 1500);
   };

   render() {
      const { refreshing, notifications, loadingMore } = this.state;
      return (
         <FlatList
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            data={notifications}
            renderItem={Notification}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Line}
            ListFooterComponent={<ListFooter loading={loadingMore} />}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.3}
         />
      );
   }
}

function ListFooter({ loading }) {
   return (
      <View style={tailwind('p-6')}>
         <ActivityIndicator color="black" animating={loading} />
      </View>
   );
}

const noti = [
   {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
   },
   {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
   },
   {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
   },
];

export default connect()(NotificationsView);
