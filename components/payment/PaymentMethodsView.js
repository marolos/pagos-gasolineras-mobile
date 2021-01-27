import React, { memo } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { typefaces, shadowStyle3 } from '../utils/styles';
import emptyImage from '../../assets/background/empty.png';
import Line from '../shared/Line';
import { connect } from 'react-redux';
import Fetch from '../utils/Fetch';
import InfoIcon from '../icons/InfoIcon';
import tailwind from 'tailwind-rn';
import FloatingButton from '../shared/FloatingButton';
import ReactNativeModal from 'react-native-modal';
import { getCardLogo } from './CardItem';
import Ripple from 'react-native-material-ripple';
import DeleteIcon from '../icons/DeleteIcon';
import SmallBackIcon from '../icons/SmallBackIcon';
import { background, btn_text, info_text, white } from '../utils/colors';
import AppButton from '../shared/AppButton';
import AddIcon from '../../assets/img/agregar.png';

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
		if (!card) return
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
				<FloatingButton
					icon={
						<View>
							<Image source={AddIcon} style={[tailwind('w-16 h-16')]} />
						</View>
					}
					onPress={() => this.props.navigation.push('addCardPaymentMethodsView', { ...this.props.route.params, previous: 'paymentMethod' } )}
				/>

				<View style={{ flex: 1, backgroundColor: white }}>
					<BackTitle navigation={this.props.navigation} />

					<View style={[tailwind('flex rounded-2xl p-6'), { flex: 1, backgroundColor: background, zIndex: 10 }]}>
						<Text style={[{ color: btn_text }, typefaces.psb, tailwind('text-lg mb-2 pl-3')]}>
							Elegir tarjeta
						</Text>
						<FlatList
							ListEmptyComponent={EmptyMessage}
							refreshing={refreshing}
							onRefresh={this.loadCards}
							data={this.props.cards}
							renderItem={this.renderItem}
							keyExtractor={this.keyExtractor}
							ItemSeparatorComponent={Line}
						/>
						{/*<Text style={[typefaces.psb, tailwind('mr-10 self-start mt-3'), {color: btn_text}]} onPress={() => this.props.navigation.push('addCardPaymentMethodsView', { ...this.props.route.params, previous: 'paymentMethod' } )}>Usar otra tarjeta</Text>*/}
						<ConfirmDelete
							show={showConfirm}
							close={() => this.setState({ showConfirm: false })}
							confirm={this.deleteCard}
						/>
					</View>
				</View>
			</React.Fragment>
		);
	}
}

const BackTitle = memo(({ navigation }) => {
	return (
		<View style={{ zIndex: 1 }}>
			<Ripple
				onPress={navigation.goBack}
				style={tailwind('rounded-full p-2 w-12 items-center')}
				rippleCentered={true}
			>
				<SmallBackIcon />
			</Ripple>
			<Text style={[tailwind('text-2xl ml-16 mb-4'), typefaces.pb]}>Metodos de pago</Text>
		</View>
	)
})

function CardItemRemovable({ item, onDelete }) {
	const { holder_name, type } = item;
	return (
		<View style={[tailwind( 'flex flex-row justify-between border border-gray-300 rounded-md my-1 px-2 py-2',),
			tailwind('mb-2 bg-white rounded-xl border border-gray-300 p-4'), shadowStyle3]}>
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
			{/*<View>
				<Image source={emptyImage} style={tailwind('w-32 h-48')} />
			</View>*/}
			<View style={tailwind('px-12')}>
				<Text style={[tailwind('text-sm text-center'), typefaces.pm, { color: info_text }]}>
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
					{/*<InfoIcon />*/}
					<Text style={[tailwind('text-xl ml-4'), typefaces.psb]}>¿Borrar tarjeta?</Text>
				</View>
				<View style={tailwind('flex flex-row justify-evenly mt-8')}>
					<AppButton text={'Cancelar'} onPress={close} primary={false} disable={true} style={{ width: 100 }} />
					<AppButton text={'Borrar'} onPress={confirm} style={{ width: 100, marginLeft: 20 }} />
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
