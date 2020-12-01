import React, { memo } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';

import emptyImage from '../../assets/background/empty.png';
import Fetch from '../utils/Fetch';
import { typefaces } from '../utils/styles';
import { makeCancelable, sortByDate } from '../utils/utils';
import { formatISODate } from '../buy/utils';
import ArrowLeftDownIcon from '../icons/ArrowLeftDownIcon';
import ArrowUpRightIcon from '../icons/ArrowUpRightIcon';
import TransferIcon from '../icons/TransferIcon';

class TransfersView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			transfers: [],
			refreshing: false,
		};
	}

	componentDidMount() {
		this.loadData();
	}

	componentWillUnmount() {
		if (this.reqTransfers) this.reqTransfers.cancel();
	}

	loadData = async () => {
		if (this.state.refreshing) return;
		this.setState({ refreshing: true });
		this.reqTransfers = makeCancelable(
			Fetch.get('/topup/user/transfer/', { all: '1' }),
			(res) => {
				this.setState({ transfers: res.body.transfers, refreshing: false });
			},
			(err) => {
				this.setState({ refreshing: false });
				console.error(err);
			},
		);
	};

	onAddTransfer = () => {
		this.props.navigation.push('createTransferView');
	};

	renderItem = ({ item }) => <TransferItem transfer={item} user={this.props.user} />;

	keyExtractor = (item) => item.id + '';

	header = () => {
		if (this.state.transfers.length < 1) return <React.Fragment />;
		return <CreateTransferButton onAddTransfer={this.onAddTransfer} />;
	};

	render() {
		const { refreshing, transfers } = this.state;
		return (
			<FlatList
				refreshing={refreshing}
				onRefresh={this.loadData}
				ListEmptyComponent={() => <EmptyMessage onAddTransfer={this.onAddTransfer} />}
				data={transfers.sort(sortByDate('created_at'))}
				renderItem={this.renderItem}
				keyExtractor={this.keyExtractor}
				ListHeaderComponent={this.header()}
				ListFooterComponent={Footer}
			/>
		);
	}
}

function TransferItem({ transfer, user }) {
	const isReceiver = parseInt(user.user_id) === parseInt(transfer.receiver_user.id);

	return (
		<View
			key={transfer.id}
			style={tailwind(
				'flex flex-row justify-between border border-gray-300 rounded-md my-1 px-2 py-2',
			)}
		>
			<View style={tailwind('flex flex-row')}>
				<View style={tailwind('mr-1')}>
					{isReceiver ? (
						<ArrowLeftDownIcon stroke="#1ED895" />
					) : (
						<ArrowUpRightIcon stroke="#19ACDA" />
					)}
				</View>
				<View>
					{isReceiver ? (
						<React.Fragment>
							<Text style={[typefaces.pm]}>Recibido</Text>
							<Text style={[typefaces.pr]}>de: {transfer.sender_user.email}</Text>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Text style={[typefaces.pm]}>Enviado</Text>
							<Text style={[typefaces.pr]}>a: {transfer.receiver_user.email}</Text>
						</React.Fragment>
					)}
					<Text style={tailwind('text-sm text-gray-700')}>
						{formatISODate(transfer.created_at)}
					</Text>
				</View>
			</View>
			<View>
				{isReceiver ? (
					<Text style={[tailwind('text-green-600 mr-1'), typefaces.psb]}>
						+ ${transfer.amount}
					</Text>
				) : (
					<Text style={[tailwind('text-red-400 mr-1'), typefaces.psb]}>
						- ${transfer.amount}
					</Text>
				)}
			</View>
		</View>
	);
}

const CreateTransferButton = memo(({ onAddTransfer }) => (
	<View style={tailwind('p-4 flex flex-row justify-end')}>
		<IconButton text="Transferir saldo" onPress={onAddTransfer} icon={<TransferIcon />} />
	</View>
));

const EmptyMessage = memo(({ onAddTransfer }) => {
	return (
		<View style={tailwind('items-center mb-12 mt-16')}>
			<View>
				<Image source={emptyImage} style={[tailwind('w-32 h-48')]} />
			</View>
			<View style={tailwind('px-12')}>
				<Text style={[tailwind('text-gray-700 text-lg text-center mb-12'), typefaces.pm]}>
					No haz realizado ninguna transferencia de saldo aún.
				</Text>
			</View>
			<IconButton text="Transferir saldo" onPress={onAddTransfer} icon={<TransferIcon />} />
		</View>
	);
});

const Footer = memo(() => <View style={{ height: 50 }} />);

function IconButton({ onPress, text, icon }) {
	return (
		<Ripple
			style={tailwind(
				'w-48 h-12 py-2 px-5 flex flex-row items-center justify-between border border-gray-700 rounded-md',
			)}
			onPress={onPress}
			rippleCentered
		>
			{icon ? icon : <></>}
			<Text style={[tailwind('text-sm'), typefaces.pm]}>{text}</Text>
		</Ripple>
	);
}

export default connect(({ user }) => ({ user: user.data }))(TransfersView);
