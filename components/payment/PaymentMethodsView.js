import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { typefaces } from '../utils/styles';
import emptyImage from '../../assets/background/empty.png';
import Line from '../shared/Line';
import { connect } from 'react-redux';
import Fetch from '../utils/Fetch';
import InfoIcon from '../icons/InfoIcon';
import tailwind from 'tailwind-rn';
import Button from '../shared/Button';
import ReactNativeModal from 'react-native-modal';
import { getCardLogo } from './CardItem';
import Ripple from 'react-native-material-ripple';
import DeleteIcon from '../icons/DeleteIcon';

class PaymentMethodsView extends React.Component {
	state = {
		showConfirm: false,
		refreshing: false,
		selectedCard: null,
	};

	componentDidMount() {
		this.loadCards();
	}

	loadCards = () => {
		this.setState({ refreshing: true });
		Fetch.get('/payment/user/card/')
			.then((res) => {
				this.props.dispatch({ type: 'SET_CARDS', value: res.body.cards });
			})
			.catch((e) => console.error(e))
			.finally(() => this.setState({ refreshing: false }));
	};

	deleteCard = () => {
		const card = this.state.selectedCard;
		this.setState({ showConfirm: false });
		if (!card) {
			return;
		}
		Fetch.delete('/payment/user/card/', card)
			.then((_res) => console.log(_res))
			.catch((err) => console.error(err));
		const newList = this.props.cards.filter((_card) => _card.token !== card.token);
		setTimeout(() => {
			this.props.dispatch({ type: 'SET_CARDS', value: newList });
		}, 400);
	};

	confirmDelete = (item) => {
		this.setState({ showConfirm: true, selectedCard: item });
	};

	keyExtractor = (item) => item.token + '';
	renderItem = ({ item }) => (
		<CardItemRemovable item={item} onDelete={() => this.confirmDelete(item)} />
	);

	render() {
		const { refreshing, showConfirm } = this.state;
		return (
			<React.Fragment>
				<FlatList
					ListEmptyComponent={EmptyMessage}
					refreshing={refreshing}
					onRefresh={this.loadCards}
					data={this.props.cards}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor}
					ItemSeparatorComponent={Line}
				/>
				<ConfirmDelete
					show={showConfirm}
					close={() => this.setState({ showConfirm: false })}
					confirm={this.deleteCard}
				/>
			</React.Fragment>
		);
	}
}

function CardItemRemovable({ item, onDelete }) {
	const { holder_name, type } = item;
	return (
		<View style={tailwind('flex flex-row justify-between px-6 py-4')}>
			<View style={styles.view}>
				<Image source={getCardLogo(type)} style={styles.image} />
				<Text style={styles.text}>{holder_name}</Text>
			</View>
			<Ripple onPress={onDelete} style={styles.deleteIcon} rippleDuration={250} rippleCentered>
				<DeleteIcon stroke="#475569" width={20} />
			</Ripple>
		</View>
	);
}

function EmptyMessage() {
	return (
		<View style={tailwind('items-center mb-12 mt-24')}>
			<View>
				<Image source={emptyImage} style={tailwind('w-32 h-48')} />
			</View>
			<View style={tailwind('px-12')}>
				<Text style={[tailwind('text-gray-600 text-center mt-4'), typefaces.pm]}>
					No tiene tarjetas guardadas
				</Text>
			</View>
		</View>
	);
}

function ConfirmDelete({ show, close, confirm }) {
	return (
		<ReactNativeModal
			isVisible={show}
			animationIn="fadeIn"
			animationOut="fadeOut"
			backdropTransitionOutTiming={0}
			style={tailwind('flex items-center')}
		>
			<View style={tailwind('p-6 rounded-md bg-white')}>
				<View style={tailwind('flex flex-row')}>
					<InfoIcon />
					<Text style={[tailwind('text-base ml-4'), typefaces.psb]}>¿Borrar tarjeta?</Text>
				</View>
				<View style={tailwind('flex flex-row justify-evenly mt-8')}>
					<Button text={'cancelar'} onPress={close} primary={false} style={{ width: 100 }} />
					<Button text={'borrar'} onPress={confirm} style={{ width: 100, marginLeft: 20 }} />
				</View>
			</View>
		</ReactNativeModal>
	);
}

const styles = {
	ripple: tailwind(
		'flex flex-row justify-between items-center bg-white border rounded-lg mb-3 px-3 h-12',
	),
	selected: tailwind('border-gray-400'),
	noSelected: tailwind('border-gray-200'),
	view: tailwind('flex flex-row items-center'),
	image: { width: 30, resizeMode: 'contain' },
	text: [tailwind('ml-3 mt-1'), typefaces.pm],
	deleteIcon: tailwind('mr-1 mt-1 items-center p-1'),
};

export default connect(({ cards }) => ({ cards }))(PaymentMethodsView);
